import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import {
  LocalStorageEndpoint,
  localStorageRepository,
} from "../services/LocalStorage";
import { IAuthSuccessfull } from "../types";
import { refreshTokensMutation } from "./mutations";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_SERVER_URL_DEV,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Path: ${path}`);
    });

    const tokenExpiredError = graphQLErrors.find(
      (error) => error.message === "Token expired",
    );

    if (tokenExpiredError) {
      const refreshToken = localStorageRepository.get<IAuthSuccessfull>(
        LocalStorageEndpoint.Auth,
      )?.refreshToken;

      if (refreshToken) {
        console.log("[GraphQL error] Trying to refresh tokens");
        apolloClient
          .mutate({
            mutation: refreshTokensMutation,
            variables: {
              input: { refreshToken },
            },
          })
          .then(({ data }) => {
            console.log(
              "[GraphQL error] Tokens were refreshed. Access restored",
            );
            localStorageRepository.set<IAuthSuccessfull>(
              LocalStorageEndpoint.Auth,
              data.refreshTokens,
            );
            window.dispatchEvent(new Event(`${LocalStorageEndpoint.Auth}-set`));
            apolloClient.refetchQueries({ include: "active" });
          })
          .catch(() => {
            console.log(
              "[GraphQL error] Tokens could not be refreshed. Access backend team",
            );
          });
      }
    }
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const data = localStorageRepository.get<IAuthSuccessfull>(
    LocalStorageEndpoint.Auth,
  );

  if (data) {
    operation.setContext({
      headers: {
        authorization: data ? `Bearer ${data.accessToken}` : "",
      },
    });
  }

  return forward(operation);
});

export const apolloClient = new ApolloClient({
  uri:
    process.env.NODE_ENV !== "production"
      ? process.env.REACT_APP_GRAPHQL_SERVER_URL_DEV
      : process.env.REACT_APP_GRAPHQL_SERVER_URL_PROD,
  cache: new InMemoryCache(),
  link: from([authMiddleware, errorLink, httpLink]),
});
