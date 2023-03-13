export const getGoogleUrl = () => {
  const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;

  const from: string = process.env.REACT_APP_GOOGLE_REDIRECT_URL!;
  const redirectUrl: string = process.env.REACT_APP_GOOGLE_REDIRECT_URL!;
  const clientId: string = process.env.REACT_APP_GOOGLE_CLIENT_ID!;

  const options = {
    redirect_uri: redirectUrl,
    client_id: clientId,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    state: from,
  };

  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
};
