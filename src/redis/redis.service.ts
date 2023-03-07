import { Injectable } from "@nestjs/common";
import { RedisCommandArgument } from "@redis/client/dist/lib/commands";
import { createClient, RedisClientType } from "redis";
import { PrivacyInfo } from "src/decorators";
import { UserInput } from "src/graphql";
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
  }: ISetOptions): Promise<void> {
    const timeInSeconds = this.calculateTimeInSeconds({ time, timeType });
    await this.client.connect();
    await this.client.set(key, value, { EX: timeInSeconds });
    await this.client.disconnect();
  }

  private async get(key: string): Promise<string | null> {
    await this.client.connect();
    const result = await this.client.get(key);
    await this.client.disconnect();

    return result;
  }

  private async deleteKey(key: string): Promise<void> {
    await this.client.connect();
    await this.client.getDel(key);
    await this.client.disconnect();
  }

  public async setTemporaryUserInfo({
    email,
    emailToken,
    password,
  }: UserInput & { emailToken: string }): Promise<void> {
    const key = `${RedisKeys.TemporaryUserData}/${emailToken}`;
    const timeType = TimeType.Hours;
    const time = 5;

    await this.set({
      key,
      value: JSON.stringify({ email, password }),
      timeType,
      time,
    });
  }

  public async getTemporaryUserInfo(token: string): Promise<UserInput | null> {
    const key = `${RedisKeys.TemporaryUserData}/${token}`;

    const data = await this.get(key);

    if (!data) return null;

    return JSON.parse(data);
  }

  public async setNewSessionData(userId: string, data: Session) {
    await this.client.connect();
    const key = `sessions:user:${userId}`;
    const JSONDataString = JSON.stringify(data);
    const isExists = await this.client.SISMEMBER(key, JSONDataString);

    if (!isExists) {
      const sessionsLength = await this.client.SCARD(key);

      const maxSessionsCount = Number(process.env.MAX_ACTIVE_SESSIONS) ?? 10;

      if (sessionsLength > maxSessionsCount) {
        const firstSession = await this.client.SMEMBERS(key);
        await this.client.SREM(key, firstSession[0]);
      }

      await this.client.SADD(key, JSONDataString);
    }

    await this.client.disconnect();
  }

  public async getAllActiveSessions(userId: string): Promise<Session[]> {
    await this.client.connect();

    const key = `sessions:user:${userId}`;
    const sessions = await this.client.SMEMBERS(key);

    await this.client.disconnect();

    return sessions.map((sessionString) => JSON.parse(sessionString));
  }

  public async isSessionActive(
    userId: string,
    privacyinfo: PrivacyInfo,
  ): Promise<boolean> {
    const sessions = await this.getAllActiveSessions(userId);

    const isActive = sessions.some(
      (session) =>
        session.ip === privacyinfo.ip &&
        session.userAgent === privacyinfo.userAgent,
    );

    return isActive;
  }
}
