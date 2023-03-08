import { Module } from "@nestjs/common";
import { AuthMailer } from "./auth.mailer";
import { UsersMailer } from "./users.mailer";

@Module({
  providers: [UsersMailer, AuthMailer],
  exports: [UsersMailer, AuthMailer],
})
export class MailersModule {}
