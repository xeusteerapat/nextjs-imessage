import { gql } from 'apollo-server-core';

export const conversationTypeDefs = gql`
  type Mutation {
    createConversation(participantIds: [String]): CreateConversationResponse
  }

  type CreateConversationResponse {
    conversationId: String
  }
`;
