import { UseFilters, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { ApolloErrorFilter } from "src/filters";
import { UserInput, ValidateEmailInput } from "src/graphql";
import { AuthService } from "./auth.service";
import { PrivacyInfo, User } from "src/decorators";
import { AuthGuard, SessionGuard } from "./guards";
import { UserWithRecords, WithoutPassword } from "src/users";

@Resolver("Auth")
@UseFilters(ApolloErrorFilter)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation()
  async login(
    @PrivacyInfo() privacyInfo: PrivacyInfo,
    @Args("input") userInput: UserInput,
  ) {
    return await this.authService.loginUser(userInput, privacyInfo);
  }

  @Mutation()
  async register(@Args("input") userInput: UserInput) {
    return await this.authService.register(userInput);
  }

  @Mutation()
  async validateEmail(@Args("input") validateEmailInput: ValidateEmailInput) {
    return await this.authService.validateRegistrationEmail(validateEmailInput);
  }

  @Query()
  @UseGuards(AuthGuard, SessionGuard)
  async signOut(
    @User() user: WithoutPassword<UserWithRecords>,
    @PrivacyInfo() privacyInfo: PrivacyInfo,
  ) {
    return await this.authService.signOut(user.id, privacyInfo);
  }
}
