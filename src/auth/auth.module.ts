import { forwardRef, Module } from "@nestjs/common";
import { JwtAccessModule, JwtRefreshModule } from "src/jwt";
import { RedisModule } from "src/redis/redis.module";
import { UsersModule } from "src/users";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtAccessModule,
    JwtRefreshModule,
    RedisModule,
  ],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
