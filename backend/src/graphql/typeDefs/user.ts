import { gql } from 'apollo-server-core';

export const userTypeDefs = gql`
  type User {
    id: String
    username: String
  }

  type CreateUsernameResponse {
    success: Boolean
    error: String
  }

  type Query {
    searchUsers(username: String): [User]
  }

  type Mutation {
    createUsername(username: String): CreateUsernameResponse
  }
`;
