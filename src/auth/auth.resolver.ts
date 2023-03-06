import { randomBytes } from "crypto";
import { forwardRef, UseFilters } from "@nestjs/common";
import { Inject } from "@nestjs/common/decorators/core/inject.decorator";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { ApolloErrorFilter } from "src/filters";
import { UserInput, ValidateEmailInput } from "src/graphql";
import { RedisService } from "src/redis/redis.service";
import { UsersService } from "src/users";
import { AuthService } from "./auth.service";
import { ApolloError } from "apollo-server-express";

enum GraphqlType {
  Error = "Error",
  RegisterSuccessfull = "RegisterSuccessfull",
  AuthSuccessfull = "AuthSuccessfull",
  EmailValidationSuccessfull = "EmailValidationSuccessfull",
}

@Resolver("Auth")
@UseFilters(ApolloErrorFilter)
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private redisService: RedisService,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    @Inject("JwtAccessService") private jwtAccessService: JwtService,
    @Inject("JwtRefreshService") private jwtRefreshServcie: JwtService,
  ) {}

  @Mutation()
  async login(@Args("input") userInput: UserInput) {
    const { email, password } = userInput;

    const validationResult = await this.authService.validateUser(
      email,
      password,
    );

    const { id: userId } = validationResult;

    const accessToken = this.jwtAccessService.sign({ userId });
    const refreshToken = this.jwtRefreshServcie.sign({ userId });

    return {
      accessToken,
      refreshToken,
    };
  }

  @Mutation()
  async register(@Args("input") userInput: UserInput) {
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
  }

  @Mutation()
  async validateEmail(@Args("input") validateEmailInput: ValidateEmailInput) {
    const { token } = validateEmailInput;

    const userTemporaryData = await this.redisService.getTemporaryUserInfo(
      token,
    );

    if (!userTemporaryData)
      throw new ApolloError("It seems validation token has expired or invalid");

    const user = await this.usersService.create(userTemporaryData);

    if (user) {
      const accessToken = this.jwtAccessService.sign({ userId: user.id });
      const refreshToken = this.jwtRefreshServcie.sign({ userId: user.id });

      return {
        accessToken,
        refreshToken,
      };
    }
  }
}
