import * as bcrypt from "bcryptjs";
import { Inject } from "@nestjs/common";
import { UserInput } from "src/graphql";
import { PrismaService } from "../prisma";
import { TwitterRecord, User } from "@prisma/client";

export type WithoutPassword<T> = Omit<T, "password">;

export type UserWithRecords = User & {
  records: TwitterRecord[];
};

export class UsersService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  public async getAll(): Promise<WithoutPassword<UserWithRecords>[]> {
    const { user: userModel } = this.prisma;
    const allUsers = await userModel.findMany({ include: { records: true } });

    return allUsers.map(this.removePasswordFromUser);
  }

  public async getById(id: string): Promise<WithoutPassword<UserWithRecords>> {
    const { user: userModel } = this.prisma;

    const user = await userModel.findFirst({
      where: { id },
      include: { records: true },
    });
    return this.removePasswordFromUser(user);
  }

  public async getByEmail(email: string): Promise<UserWithRecords> {
    const { user: userModel } = this.prisma;

    return await userModel.findFirst({
      where: { email },
      include: { records: true },
    });
  }

  public async create(
    userInput: UserInput,
  ): Promise<WithoutPassword<UserWithRecords>> {
    const { user: userModel } = this.prisma;

    const { email, password } = userInput;
    const hashedPassword = await this.hashPassword(password);

    const user = await userModel.create({
      data: { email, password: hashedPassword },
      include: { records: true },
    });
    return this.removePasswordFromUser(user);
  }

  private async hashPassword(password: string): Promise<string> {
    const hashedPassword: string = await bcrypt.hash(
      password,
      Number(process.env.CRYPT_SALT) ?? 10,
    );
    return hashedPassword;
  }

  public removePasswordFromUser(user: UserWithRecords) {
    const { password, ...otherData } = user;

    return { ...otherData };
  }
}
