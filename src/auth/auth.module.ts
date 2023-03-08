import { forwardRef, Module } from "@nestjs/common";

import { JwtAccessModule, JwtRefreshModule } from "src/jwt";
import { MailersModule } from "src/mailers";
import { RedisModule } from "src/redis";
import { UsersModule } from "src/users";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtAccessModule,
    JwtRefreshModule,
    RedisModule,
    MailersModule,
  ],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
