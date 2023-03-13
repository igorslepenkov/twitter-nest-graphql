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
