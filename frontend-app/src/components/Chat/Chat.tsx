import { Button, Flex } from '@chakra-ui/react';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import ConversationWrapper from './Conversation/ConversationWrapper';
import FeedWrapper from './Feed/FeedWrapper';

interface IChatProps {
  session: Session;
}

const Chat: React.FC<IChatProps> = ({ session }) => {
  return (
    <Flex height='100vh'>
      <ConversationWrapper session={session} />
      <FeedWrapper />
      <Button onClick={() => signOut()}>Sign Out</Button>
    </Flex>
  );
};

export default Chat;
