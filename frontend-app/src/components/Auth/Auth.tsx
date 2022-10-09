import { useMutation } from '@apollo/client';
import { Button, Center, Stack, Text, Image, Input } from '@chakra-ui/react';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { userOperations } from '../../graphql/operations/user';
import {
  CreateUsernameData,
  CreateUsernameVariables,
  IAuthProps,
} from '../../types/interfaces/auth-interface';

const Auth: React.FC<IAuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState('');
  const [createUsername, { loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(userOperations.Mutations.createUsername);

  const handleSubmit = async () => {
    if (!username) {
      return;
    }

    try {
      const { data } = await createUsername({
        variables: {
          username,
        },
      });

      if (!data?.createUsername) {
        throw new Error();
      }

      if (data.createUsername.error) {
        const {
          createUsername: { error },
        } = data;

        throw new Error(error);
      }

      toast.success('Username Successfully created! 🎉');

      // reload session to obtain new username
      reloadSession();
    } catch (error: any) {
      toast.error(error.message);
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
            <Button onClick={handleSubmit} width='100%'>
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
