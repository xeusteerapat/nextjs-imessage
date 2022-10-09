import { Button } from '@chakra-ui/react';
import { signOut } from 'next-auth/react';

interface IChatProps {}

const Chat: React.FC<IChatProps> = props => {
  return (
    <div>
      <h1>Chat Component</h1>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
};

export default Chat;
