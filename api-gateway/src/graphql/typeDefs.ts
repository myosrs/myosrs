import { gql } from "apollo-server";

export const typeDefs = gql`
  type Skill {
    rank: Int
    level: Int
    experience: Int
  }

  type Account {
    name: String!
    overall: Skill
  }

  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String!
  }

  type Query {
    accounts: [Account!]!
  }

  type Mutation {
    createUser(email: String!, password: String!): User!
  }
`;
