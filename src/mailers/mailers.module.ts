import { Module } from "@nestjs/common";
import { UsersMailer } from "./users.mailer";

@Module({
  providers: [UsersMailer],
  exports: [UsersMailer],
})
export class MailersModule {}
