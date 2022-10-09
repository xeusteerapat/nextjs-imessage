import { useLazyQuery, useQuery } from '@apollo/client';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';
import * as React from 'react';
import { userOperations } from '../../../../graphql/operations/user';
import {
  SearceUsersData,
  SearceUsersInput,
  SearchedUser,
} from '../../../../types/interfaces/users-interfaces';
import UsersSearchList from './UsersSearchList';

interface IConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConversationModal: React.FC<IConversationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [username, setUsername] = React.useState('');
  const [participants, setParticipants] = React.useState<SearchedUser[]>([]);

  const [searchUsers, { data, loading, error }] = useLazyQuery<
    SearceUsersData,
    SearceUsersInput
  >(userOperations.Queries.searchUsers);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    searchUsers({
      variables: {
        username,
      },
    });
  };

  const addParticipant = (user: SearchedUser) => {
    setParticipants(prev => [...prev, user]);
    setUsername('');
  };

  const removeParticipant = (userId: string) => {
    setParticipants(prev => prev.filter(user => user.id !== userId));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pb={4}>
          <ModalHeader>Create a Conversation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSearch}>
              <Stack spacing={4}>
                <Input
                  placeholder='search for users'
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
                <Button type='submit' disabled={!username} isLoading={loading}>
                  Search
                </Button>
              </Stack>
            </form>
            {data?.searchUsers && (
              <UsersSearchList
                users={data.searchUsers}
                addParticipant={addParticipant}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConversationModal;
