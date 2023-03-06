import * as bcrypt from "bcryptjs";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { UsersService, UserWithRecords, WithoutPassword } from "src/users";
import { ApolloError } from "apollo-server-express";

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
  ) {}

  public async validateUser(
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
