import { userResolvers } from './user';
import { conversationResolvers } from './conversation';
import merge from 'lodash.merge';

export const resolvers = merge({}, userResolvers, conversationResolvers);
