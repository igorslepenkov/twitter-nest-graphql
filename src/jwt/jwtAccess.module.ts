import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtService } from "@nestjs/jwt/dist";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_ACCESS_EXP_IN },
    }),
  ],
  providers: [{ provide: "JwtAccessService", useExisting: JwtService }],
  exports: ["JwtAccessService"],
})
export class JwtAccessModule {}
