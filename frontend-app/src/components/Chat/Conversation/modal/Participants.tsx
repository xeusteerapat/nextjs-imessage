import { Flex, Stack, Text } from '@chakra-ui/react';
import * as React from 'react';
import { SearchedUser } from '../../../../types/interfaces/users-interfaces';
import { IoIosCloseCircleOutline } from 'react-icons/io';

interface IParticipantsProps {
  participants: SearchedUser[];
  removeParticipant: (userId: string) => void;
}

const Participants: React.FC<IParticipantsProps> = ({
  participants,
  removeParticipant,
}) => {
  return (
    <Flex mt={8} gap='10px' flexWrap='wrap'>
      {participants.map(user => (
        <Stack
          key={user.id}
          direction='row'
          align='center'
          bg='whiteAlpha.200'
          borderRadius={4}
          p={2}
        >
          <Text>{user.username}</Text>
          <IoIosCloseCircleOutline
            size={20}
            cursor='pointer'
            onClick={() => removeParticipant(user.id)}
          />
        </Stack>
      ))}
    </Flex>
  );
};

export default Participants;
