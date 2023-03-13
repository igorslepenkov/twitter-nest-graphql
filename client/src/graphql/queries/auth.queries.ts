import { gql } from "@apollo/client";

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
