import { Injectable } from "@nestjs/common";
import { BaseMailer } from "./BaseMailer";

@Injectable()
export class UsersMailer extends BaseMailer {
  public async sendEmailValidationMessage(token: string, email: string) {
    const domain =
      process.env.NODE_ENV === "production"
        ? process.env.REACT_PROD_DOMAIN
        : process.env.REACT_DEV_DOMAIN;

    const validateEmailLink = `http://${domain}/validateEmail/${token}`;

    await this.send({
      to: email,
      subject: "Validation message",
      view: "usersMailer/emailValidationMessage",
      htmlVariables: { link: validateEmailLink },
    });
  }
}
