import { UseFilters } from "@nestjs/common";
import { UseGuards } from "@nestjs/common/decorators/core/use-guards.decorator";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthGuard, SessionGuard } from "src/auth";
import { UsersInputDTO } from "src/auth/dto";
import { ApolloErrorFilter } from "src/filters";
import { UserWithoutPassword } from "src/graphql";
import { GetUserInputDTO } from "./dto";
import { UsersService } from "./users.service";

@Resolver("User")
@UseFilters(ApolloErrorFilter)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query()
  @UseGuards(AuthGuard, SessionGuard)
  async users() {
    return await this.usersService.getAll();
  }

  @Query()
  async user(@Args("input") { id }: GetUserInputDTO) {
    return await this.usersService.getById(id);
  }

  @Mutation((returns) => UserWithoutPassword)
  async createUser(@Args("input") userInput: UsersInputDTO) {
    return await this.usersService.create(userInput);
  }
}
