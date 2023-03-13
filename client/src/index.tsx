import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { apolloClient } from "./graphql";
import { appRouter } from "./router";
import { GlobalStyles } from "./ui";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <ApolloProvider client={apolloClient}>
    <GlobalStyles />
    <RouterProvider router={appRouter} />
  </ApolloProvider>,
);
