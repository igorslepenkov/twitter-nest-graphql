import { Injectable } from "@nestjs/common";
import { PrivacyInfo } from "src/decorators";
import { BaseMailer } from "./BaseMailer";

@Injectable()
export class AuthMailer extends BaseMailer {
  public async sendLoginMessage(email: string, privacyInfo: PrivacyInfo) {
    await this.send({
      to: email,
      subject: "Login in account",
      view: "authMailer/loginMessage",
      htmlVariables: { privacyInfo },
    });
  }
}
