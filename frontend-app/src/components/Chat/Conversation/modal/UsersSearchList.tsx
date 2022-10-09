import { Avatar, Button, Flex, Stack, Text } from '@chakra-ui/react';
import * as React from 'react';
import { SearchedUser } from '../../../../types/interfaces/users-interfaces';

interface IUsersSearchListProps {
  users: SearchedUser[];
  addParticipant: (user: SearchedUser) => void;
}

const UsersSearchList: React.FC<IUsersSearchListProps> = ({
  users,
  addParticipant,
}) => {
  return (
    <>
      {users.length === 0 ? (
        <Flex mt={6} justify='center'>
          <Text>No users found</Text>
        </Flex>
      ) : (
        <Stack mt={6}>
          {users.map(user => (
            <Stack
              direction='row'
              key={user.id}
              align='center'
              spacing={4}
              py={2}
              px={4}
              borderRadius={4}
              _hover={{
                bg: 'whiteAlpha.200',
              }}
            >
              <Avatar src='' />
              <Flex justify='space-between' width='100%' align='center'>
                <Text>{user.username}</Text>
                <Button bg='brand.100' onClick={() => addParticipant(user)}>
                  Select
                </Button>
              </Flex>
            </Stack>
          ))}
        </Stack>
      )}
    </>
  );
};

export default UsersSearchList;
