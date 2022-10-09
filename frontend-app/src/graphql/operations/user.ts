import { gql } from '@apollo/client';

export const userOperations = {
  Queries: {
    searchUsers: gql`
      query SearchedUser($username: String!) {
        searchUsers(username: $username) {
          id
          username
        }
      }
    `,
  },
  Mutations: {
    createUsername: gql`
      mutation CreateUsername($username: String!) {
        createUsername(username: $username) {
          success
          error
        }
      }
    `,
  },
  Subscriptions: {},
};
