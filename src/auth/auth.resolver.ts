import { UseFilters } from "@nestjs/common";
import { Inject } from "@nestjs/common/decorators/core/inject.decorator";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { ApolloErrorFilter } from "src/filters";
import { UserInput } from "src/graphql";
import { AuthService } from "./auth.service";

@Resolver("Auth")
@UseFilters(ApolloErrorFilter)
export class AuthResolver {
  constructor(
    private authService: AuthService,
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

    if (!validationResult) {
      return { error: "Unauthorized!", __typename: "AuthorizationError" };
    }

    const { id: userId } = validationResult;

    const accessToken = this.jwtAccessService.sign({ userId });
    const refreshToken = this.jwtRefreshServcie.sign({ userId });

    return { accessToken, refreshToken, __typename: "LoginSuccessfull" };
  }
}
