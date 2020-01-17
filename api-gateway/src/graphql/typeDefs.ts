import { gql } from "apollo-server";

export const typeDefs = gql`
  type Account {
    name: String!
  }

  type Query {
    accounts: [Account!]!
  }
`;
