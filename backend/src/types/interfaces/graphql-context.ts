import { PrismaClient } from '@prisma/client';
import { DefaultUser } from 'next-auth';

export interface User extends DefaultUser {
  id: string;
  username: string;
}

export interface Session {
  user?: User;
}

export interface GraphQLContext {
  session: Session | null;
  prisma: PrismaClient;
}
