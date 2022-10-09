import { CreateUsernameResponse } from './../../types/interfaces/user-response';
import { GraphQLContext } from './../../types/interfaces/graphql-context';
import { ApolloError } from 'apollo-server-core';
import { User } from '@prisma/client';

export const userResolvers = {
  Query: {
    searchUsers: async (
      _: any,
      args: { username: string },
      context: GraphQLContext
    ): Promise<Array<User> | undefined> => {
      const { username: searchedUsername } = args;

      const { session, prisma } = context;

      if (!session?.user) {
        throw new ApolloError('Not Authorized');
      }

      const currentLoggedInUser = session.user.username;

      try {
        const users = await prisma.user.findMany({
          where: {
            username: {
              contains: searchedUsername,
              not: currentLoggedInUser,
              mode: 'insensitive',
            },
          },
        });

        return users;
      } catch (error) {
        if (error instanceof Error) {
          console.log('create username error:', error);
          throw new ApolloError(error.message);
        }
      }
    },
  },
  Mutation: {
    createUsername: async (
      _: any,
      args: { username: string },
      context: GraphQLContext
    ): Promise<CreateUsernameResponse | undefined> => {
      const { username } = args;
      const { session, prisma } = context;

      if (!session?.user) {
        return {
          error: 'Not Authenticated',
        };
      }

      const userId = session.user.id;

      try {
        const existsUser = await prisma.user.findUnique({
          where: {
            username,
          },
        });

        if (existsUser) {
          return {
            error: 'Username already taken',
          };
        }

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            username,
          },
        });

        return {
          success: true,
        };
      } catch (error) {
        if (error instanceof Error) {
          console.log('create username error:', error);
          return {
            error: error?.message,
          };
        }
      }
    },
  },
  // Subscription: {
  //   createUsername: () => {},
  // },
};
