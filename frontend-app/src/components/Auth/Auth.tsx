import { Button, Center, Stack, Text, Image, Input } from '@chakra-ui/react';
import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FC<IAuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = async () => {
    try {
      console.log('add username');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Center height='100vh'>
      <Stack align='center' spacing={8}>
        {session ? (
          <>
            <Text fontSize='3xl'>Enter a username</Text>
            <Input
              placeholder='Enter a username'
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <Button onSubmit={handleSubmit} width='100%'>
              Save
            </Button>
          </>
        ) : (
          <>
            <Text fontSize='3xl'>Welcome to iMessageQL</Text>
            <Button
              onClick={() => signIn('google')}
              // eslint-disable-next-line jsx-a11y/alt-text
              leftIcon={<Image height='20px' src='/images/googlelogo.png' />}
            >
              Continue with Google
            </Button>
          </>
        )}
      </Stack>
    </Center>
  );
};

export default Auth;
