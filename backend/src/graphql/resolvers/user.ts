export const userResolvers = {
  Query: {
    searchUsers: () => {},
  },
  Mutation: {
    createUsername: (_: any, args: { username: string }, context: any) => {
      const { username } = args;
      console.log('create username', username);
      console.log('create ctx', context);
    },
  },
  // Subscription: {
  //   createUsername: () => {},
  // },
};
