import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtService } from "@nestjs/jwt/dist";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_REFRESH_EXP_IN },
    }),
  ],
  providers: [{ provide: "JwtRefreshService", useExisting: JwtService }],
  exports: ["JwtRefreshService"],
})
export class JwtRefreshModule {}
