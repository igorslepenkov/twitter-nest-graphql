export interface IUsersInput {
  email: string;
  password: string;
}

export interface IValidateEmailInput {
  token: string;
}

export interface IRefreshTokensInput {
  refreshToken: string;
}

export interface IAuthSuccessfull {
  accessToken: string;
  refreshToken: string;
}

export interface IRegisterSuccessfull {
  message: string;
}

export interface IEmailValidationSuccessfull {
  mesage: string;
}

export interface ISignOutSuccessfull {
  message: string;
}

export interface IUserWithoutPassword {
  id: string;
  email: string;
}
