import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserInput, UserWithoutPassword } from "src/graphql";
import { UsersService } from "./users.service";

@Resolver("User")
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query()
  async users() {
    return await this.usersService.getAll();
  }

  @Query()
  async user(@Args("id") id: string) {
    return await this.usersService.getById(id);
  }

  @Mutation((returns) => UserWithoutPassword)
  async createUser(@Args("input") userInput: UserInput) {
    return await this.usersService.create(userInput);
  }
}
