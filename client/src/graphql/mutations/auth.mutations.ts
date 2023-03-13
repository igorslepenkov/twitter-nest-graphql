import { gql } from "@apollo/client";

export const refreshTokensMutation = gql`
  mutation Mutation($input: RefreshTokensInput) {
    refreshTokens(input: $input) {
      accessToken
      refreshToken
    }
  }
`;

export const signOutMutation = gql`
  mutation Mutation {
    signOut {
      message
    }
  }
`;

export const loginMutation = gql`
  mutation Login($input: UsersInput!) {
    login(input: $input) {
      accessToken
      refreshToken
    }
  }
`;

export const registerMutation = gql`
  mutation Mutation($input: UsersInput) {
    register(input: $input) {
      message
    }
  }
`;

export const validateEmailMutation = gql`
  mutation ValidateEmail($input: ValidateEmailInput) {
    validateEmail(input: $input) {
      accessToken
      refreshToken
    }
  }
`;
