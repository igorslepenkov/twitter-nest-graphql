import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri:
    process.env.NODE_ENV !== "production"
      ? process.env.REACT_APP_GRAPHQL_SERVER_URL_DEV
      : process.env.REACT_APP_GRAPHQL_SERVER_URL_PROD,
  cache: new InMemoryCache(),
});
