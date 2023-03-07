import { randomBytes } from "crypto";

import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { ApolloError } from "apollo-server-express";

import { UsersService, UserWithRecords, WithoutPassword } from "src/users";
import {
  AuthSuccessfull,
  RegisterSuccessfull,
  UserInput,
  ValidateEmailInput,
  SignOutSuccessfull,
} from "src/graphql";
import { RedisService } from "src/redis";
import { AuthMailer, UsersMailer } from "src/mailers";
import { PrivacyInfo } from "src/decorators";

@Injectable()
export class AuthService {
  constructor(
    private redisService: RedisService,
    private authMailer: AuthMailer,
    private usersMailer: UsersMailer,
    @Inject("JwtAccessService") private jwtAccessService: JwtService,
    @Inject("JwtRefreshService") private jwtRefreshServcie: JwtService,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
  ) {}

  public async loginUser(
    userInput: UserInput,
    privacyInfo: PrivacyInfo,
  ): Promise<AuthSuccessfull> {
    try {
      const { email, password } = userInput;

      const validationResult = await this.validateUser(email, password);

      const { id: userId } = validationResult;

      const accessToken = this.jwtAccessService.sign({ userId });
      const refreshToken = this.jwtRefreshServcie.sign({ userId });

      const isSet = await this.redisService.setNewSessionData(userId, {
        ...privacyInfo,
        accessToken,
        refreshToken,
      });

      if (isSet) await this.authMailer.sendLoginMessage(email, privacyInfo);

      return {
        accessToken,
        refreshToken,
      };
    } catch (err) {
      const message = err.message;

      if (message) {
        throw new ApolloError(message);
      }

      throw new ApolloError("Unexpected user login error");
    }
  }

  public async register(userInput: UserInput): Promise<RegisterSuccessfull> {
    try {
      const { email, password } = userInput;

      const userExists = await this.usersService.getByEmail(email);

      if (userExists) throw new ApolloError("User already exists");

      const hashedPassword = await this.usersService.hashPassword(password);
      const emailToken = randomBytes(30).toString("hex");

      await this.redisService.setTemporaryUserInfo({
        email,
        password: hashedPassword,
        emailToken,
      });

      await this.usersMailer.sendEmailValidationMessage(emailToken, email);
      return {
        message:
          "We have sent you validation email. Please follow instructions from this email",
      };
    } catch (err) {
      const message = err.message;

      if (message) {
        throw new ApolloError(message);
      }

      throw new ApolloError("Unexpected user login error");
    }
  }

  public async validateRegistrationEmail(
    validateEmailInput: ValidateEmailInput,
  ): Promise<AuthSuccessfull> {
    try {
      const { token } = validateEmailInput;

      const userTemporaryData = await this.redisService.getTemporaryUserInfo(
        token,
      );

      if (!userTemporaryData)
        throw new ApolloError(
          "It seems validation token has expired or invalid",
        );

      const user = await this.usersService.create(userTemporaryData);

      if (user) {
        const accessToken = this.jwtAccessService.sign({ userId: user.id });
        const refreshToken = this.jwtRefreshServcie.sign({ userId: user.id });

        return {
          accessToken,
          refreshToken,
        };
      }
    } catch (err) {
      const message = err.message;

      if (message) {
        throw new ApolloError(message);
      }

      throw new ApolloError("Unexpected user login error");
    }
  }

  public async signOut(
    userId: string,
    privacyInfo: PrivacyInfo,
  ): Promise<SignOutSuccessfull> {
    try {
      await this.redisService.removeActiveSession(userId, privacyInfo);
      return {
        message: "Sign out successfull",
      };
    } catch (err) {
      const message = err.message;

      if (message) {
        throw new ApolloError(message);
      }

      throw new ApolloError("Unexpected user login error");
    }
  }

  private async validateUser(
    email: string,
    password: string,
  ): Promise<WithoutPassword<UserWithRecords> | null> {
    try {
      const user = await this.usersService.getByEmail(email);

      if (user) {
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) throw new ApolloError("Password is incorrect");

        return this.usersService.removePasswordFromUser(user);
      }

      throw new ApolloError("It seems that user with such email not exists");
    } catch (err) {
      const { message } = err;

      if (message) {
        throw new ApolloError(message);
      }

      throw new ApolloError("Unexpected error during user validation");
    }
  }
}
