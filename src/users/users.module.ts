import { forwardRef, Module } from "@nestjs/common";

import { AuthModule } from "src/auth";
import { JwtAccessModule } from "src/jwt";
import { RedisModule } from "src/redis";
import { PrismaModule } from "../prisma";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";

@Module({
  providers: [UsersService, UsersResolver],
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule),
    JwtAccessModule,
    RedisModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
