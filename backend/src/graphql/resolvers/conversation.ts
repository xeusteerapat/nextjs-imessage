import { GraphQLContext } from './../../types/interfaces/graphql-context';
export const conversationResolvers = {
  Mutation: {
    createConversation: async (
      _: any,
      args: { participantIds: string[] },
      context: GraphQLContext
    ) => {
      const { participantIds } = args;
      console.log('create conversation', participantIds);
    },
  },
};
