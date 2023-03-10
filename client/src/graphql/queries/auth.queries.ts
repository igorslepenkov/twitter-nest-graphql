import { gql } from "@apollo/client";

export const loginQuery = gql`
  query Login($input: UsersInput!) {
    login(input: $input) {
      accessToken
      refreshToken
    }
  }
`;

export const currentUserQuery = gql`
  query CurrentUser {
    currentUser {
      id
      email
    }
  }
`;

export const signOutQuery = gql`
  query SignOut {
    signOut {
      message
    }
  }
`;
