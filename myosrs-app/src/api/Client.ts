import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";

const link = createHttpLink({
  uri: `${process.env.REACT_APP_GRAPHQL_URI}/graphql`,
  credentials: "include"
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});
