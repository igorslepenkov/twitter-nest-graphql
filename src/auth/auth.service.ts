import * as bcrypt from "bcryptjs";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { UsersService, UserWithRecords, WithoutPassword } from "src/users";

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<WithoutPassword<UserWithRecords> | null> {
    const user = await this.usersService.getByEmail(email);

    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (isPasswordCorrect) {
        return this.usersService.removePasswordFromUser(user);
      }
    }

    return null;
  }
}
