import { gql } from "apollo-server";

export const typeDefs = gql`
  scalar Date

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

  type UserSession {
    createdAt: Date!
    expiresAt: Date!
    id: ID!
    user: User!
  }

  type Query {
    accounts: [Account!]!
    userSession(me: Boolean!): UserSession
  }

  type Mutation {
    createUser(email: String!, password: String!): User!
    createUserSession(email: String!, password: String!): UserSession!
    deleteUserSession(sessionId: ID!): Boolean!
  }
`;
