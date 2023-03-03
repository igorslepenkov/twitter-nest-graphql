import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";

@Module({
  providers: [UsersService, UsersResolver],
  imports: [PrismaModule]
})

export class UsersModule {}