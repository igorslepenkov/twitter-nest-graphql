import { Injectable } from "@nestjs/common";
import { RedisCommandArgument } from "@redis/client/dist/lib/commands";
import { createClient, RedisClientType } from "redis";

import { PrivacyInfo } from "src/decorators";
import { AuthSuccessfull, UserInput } from "src/graphql";
import { Session } from "src/types";

export enum TimeType {
  Hours = "hours",
  Minutes = "minutes",
  Seconds = "seconds",
}

export enum RedisKeys {
  TemporaryUserData = "temporaryUserData",
}

interface ISetOptions {
  key: string;
  value: RedisCommandArgument;
  timeType: TimeType;
  time: number;
}

@Injectable()
export class RedisService {
  private readonly client: RedisClientType;
  constructor() {
    this.client =
      process.env.NODE_ENV === "production"
        ? createClient({ url: "redis://redis:6379" })
        : createClient();
  }

  private calculateTimeInSeconds({
    time,
    timeType,
  }: Pick<ISetOptions, "time" | "timeType">): number {
    switch (timeType) {
      case TimeType.Hours:
        return Math.round(time * 3600);
      case TimeType.Minutes:
        return Math.round(time * 60);
      case TimeType.Seconds:
        return time;
    }
  }

  private async set({
    key,
    value,
    timeType,
    time,
  }: ISetOptions): Promise<boolean> {
    const timeInSeconds = this.calculateTimeInSeconds({ time, timeType });
    await this.client.connect();
    await this.client.set(key, value, { EX: timeInSeconds });
    await this.client.disconnect();
    return true;
  }

  private async get(key: string): Promise<string | null> {
    await this.client.connect();
    const result = await this.client.get(key);
    await this.client.disconnect();

    return result;
  }

  private async deleteKey(key: string): Promise<boolean> {
    await this.client.connect();
    await this.client.getDel(key);
    await this.client.disconnect();
    return true;
  }

  private async keys(pattern: string): Promise<string[]> {
    await this.client.connect();
    const keys = await this.client.KEYS(pattern);
    await this.client.disconnect();
    return keys;
  }

  public async setTemporaryUserInfo({
    email,
    emailToken,
    password,
  }: UserInput & { emailToken: string }): Promise<boolean> {
    const key = `${RedisKeys.TemporaryUserData}/${emailToken}`;
    const timeType = TimeType.Hours;
    const time = 5;

    await this.set({
      key,
      value: JSON.stringify({ email, password }),
      timeType,
      time,
    });

    return true;
  }

  public async getTemporaryUserInfo(token: string): Promise<UserInput | null> {
    const key = `${RedisKeys.TemporaryUserData}/${token}`;

    const data = await this.get(key);

    if (!data) return null;

    return JSON.parse(data);
  }

  public async setNewSessionData(
    userId: string,
    data: Session,
  ): Promise<boolean> {
    const key = `user/${userId}/session/${data.ip}`;
    const isExists = Boolean(await this.get(key));
    if (!isExists) {
      const sessionKeys = await this.keys(`user/${userId}/*`);
      const sessionsCount = sessionKeys.length;
      const maxSessionsCount = Number(process.env.MAX_ACTIVE_SESSIONS) ?? 10;
      if (sessionsCount > maxSessionsCount)
        await this.deleteKey(sessionKeys[0]);

      const timeType = TimeType.Hours;
      const time = Number(process.env.SESSION_EXPIRATION_TIME) ?? 12;
      return await this.set({
        key,
        value: JSON.stringify(data),
        timeType,
        time,
      });
    }

    return false;
  }

  public async getAllActiveSessions(userId: string): Promise<Session[]> {
    await this.client.connect();

    const keys = await this.client.KEYS(`user/${userId}/*`);
    const sessions = await this.client.MGET(keys);

    await this.client.disconnect();

    return sessions.map((sessionString) => JSON.parse(sessionString));
  }

  public async getActiveSession(
    userId: string,
    { ip }: PrivacyInfo,
  ): Promise<Session | null> {
    const session = await this.get(`user/${userId}/session/${ip}`);
    return JSON.parse(session);
  }

  public async refreshSession(
    userId: string,
    { ip, userAgent }: PrivacyInfo,
    tokens: AuthSuccessfull,
  ): Promise<boolean> {
    const timeType = TimeType.Hours;
    const time = Number(process.env.SESSION_EXPIRATION_TIME) ?? 12;
    await this.set({
      key: `user/${userId}/session/${ip}`,
      value: JSON.stringify({ ip, userAgent, ...tokens }),
      timeType,
      time,
    });

    return true;
  }

  public async isSessionActive(
    userId: string,
    { ip }: PrivacyInfo,
  ): Promise<boolean> {
    await this.client.connect();
    const key = `user/${userId}/session/${ip}`;
    const isExists = await this.client.EXISTS(key);
    await this.client.disconnect();
    return Boolean(isExists);
  }

  public async removeActiveSession(
    userId: string,
    { ip }: PrivacyInfo,
  ): Promise<boolean> {
    const key = `user/${userId}/session/${ip}`;
    return await this.deleteKey(key);
  }
}
