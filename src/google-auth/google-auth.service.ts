import qs from "qs";
import { Injectable } from "@nestjs/common";
import axios from "axios";
import { IGoogleOAuthData, IGoogleUserResult } from "src/types";

@Injectable()
export class GoogleAuthService {
  public async getGoogleOauthToken({ code }: { code: string }) {
    const rootURl = "https://oauth2.googleapis.com/token";

    const clientId = process.env.GOOGLE_CLIENT_ID!;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
    const redirectUrl = process.env.GOOGLE_REDIRECT_URL!;

    const options = {
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUrl,
      grant_type: "authorization_code",
    };
    try {
      const { data } = await axios.post<IGoogleOAuthData>(
        rootURl,
        qs.stringify(options),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      return data;
    } catch (err: any) {
      console.log("Failed to fetch Google Oauth Tokens");
      throw new Error(err);
    }
  }

  public async getGoogleUser({
    id_token,
    access_token,
  }: {
    id_token: string;
    access_token: string;
  }): Promise<IGoogleUserResult> {
    try {
      const { data } = await axios.get<IGoogleUserResult>(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        },
      );

      return data;
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}
