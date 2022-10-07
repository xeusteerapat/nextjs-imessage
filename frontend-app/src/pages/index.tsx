import type { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';

const Home: NextPage = () => {
  const { data, status } = useSession();

  return (
    <div>
      <h1>Hi</h1>
      {!data?.user ? (
        <button onClick={() => signIn('google')}>Sign in</button>
      ) : (
        <div>
          <h2>{data.user.name}</h2>
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      )}
    </div>
  );
};

export default Home;
