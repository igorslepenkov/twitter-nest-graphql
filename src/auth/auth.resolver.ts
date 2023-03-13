import { UseFilters, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { ApolloErrorFilter } from "src/filters";
import { AuthService } from "./auth.service";
import { PrivacyInfo, User } from "src/decorators";
import { AuthGuard, SessionGuard } from "./guards";
import { UserWithRecords, WithoutPassword } from "src/users";
import {
  UsersInputDTO,
  ValidateEmailInputDTO,
  RefreshTokensInputDTO,
} from "./dto";
import { GoogleAuthInput } from "src/graphql";

@Resolver("Auth")
@UseFilters(ApolloErrorFilter)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation()
  async login(
    @PrivacyInfo() privacyInfo: PrivacyInfo,
    @Args("input") userInput: UsersInputDTO,
  ) {
    return await this.authService.loginUser(userInput, privacyInfo);
  }

  @Query()
  @UseGuards(AuthGuard, SessionGuard)
  async currentUser(@User() user: WithoutPassword<UserWithRecords>) {
    return user;
  }

  @Mutation()
  async register(@Args("input") userInput: UsersInputDTO) {
    return await this.authService.register(userInput);
  }

  @Mutation()
  async validateEmail(
    @PrivacyInfo() privacyInfo: PrivacyInfo,
    @Args("input") validateEmailInput: ValidateEmailInputDTO,
  ) {
    return await this.authService.validateRegistrationEmail(
      privacyInfo,
      validateEmailInput,
    );
  }

  @Mutation()
  async refreshTokens(
    @PrivacyInfo() privacyInfo: PrivacyInfo,
    @Args("input") { refreshToken }: RefreshTokensInputDTO,
  ) {
    return await this.authService.refreshSession(privacyInfo, refreshToken);
  }

  @Mutation()
  @UseGuards(AuthGuard, SessionGuard)
  async signOut(
    @User() user: WithoutPassword<UserWithRecords>,
    @PrivacyInfo() privacyInfo: PrivacyInfo,
  ) {
    return await this.authService.signOut(user.id, privacyInfo);
  }

  @Mutation()
  async googleAuth(
    @PrivacyInfo() privacyInfo: PrivacyInfo,
    @Args("input") googleAuthInput: GoogleAuthInput,
  ) {
    return await this.authService.googleAuth(googleAuthInput, privacyInfo);
  }
}
