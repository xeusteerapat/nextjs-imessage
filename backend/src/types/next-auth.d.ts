import 'next-auth';

declare module 'next-auth' {
  // custome interface that extends from next-auth
  interface Session {
    user: User;
  }

  interface User {
    id: string;
    username: string;
  }
}
