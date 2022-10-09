import { Box } from '@chakra-ui/react';
import { Session } from 'next-auth';
import * as React from 'react';
import ConversationList from './ConversationList';

interface IConversationWrapperProps {
  session: Session;
}

const ConversationWrapper: React.FC<IConversationWrapperProps> = ({
  session,
}) => {
  return (
    <Box
      width={{
        base: '100%',
        md: '400px',
      }}
      border='1px solid red'
      bg='whiteAplpha.50'
      py={6}
      px={3}
    >
      <ConversationList session={session} />
    </Box>
  );
};

export default ConversationWrapper;
