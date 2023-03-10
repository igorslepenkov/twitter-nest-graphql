import { gql } from "@apollo/client";

export const refreshTokensMutation = gql`
  mutation Mutation($input: RefreshTokensInput) {
    refreshTokens(input: $input) {
      accessToken
      refreshToken
    }
  }
`;
