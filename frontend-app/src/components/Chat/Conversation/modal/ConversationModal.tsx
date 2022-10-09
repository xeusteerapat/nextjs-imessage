import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
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
import { Session } from 'next-auth';
import * as React from 'react';
import toast from 'react-hot-toast';
import { conversationOperations } from '../../../../graphql/operations/conversation';
import { userOperations } from '../../../../graphql/operations/user';
import {
  CreateConversationData,
  CreateConversationInput,
} from '../../../../types/interfaces/conversation-interfaces';
import {
  SearceUsersData,
  SearceUsersInput,
  SearchedUser,
} from '../../../../types/interfaces/users-interfaces';
import Participants from './Participants';
import UsersSearchList from './UsersSearchList';

interface IConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: Session;
}

const ConversationModal: React.FC<IConversationModalProps> = ({
  isOpen,
  onClose,
  session,
}) => {
  const { user } = session;
  const [username, setUsername] = React.useState('');
  const [participants, setParticipants] = React.useState<SearchedUser[]>([]);

  const [searchUsers, { data, loading, error }] = useLazyQuery<
    SearceUsersData,
    SearceUsersInput
  >(userOperations.Queries.searchUsers);
  const [createConversation, { loading: createConversationLoading }] =
    useMutation<CreateConversationData, CreateConversationInput>(
      conversationOperations.Mutations.createConversation
    );

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

  const onCreateConversation = async () => {
    try {
      const { data } = await createConversation({
        variables: {
          participantIds: [...participants.map(user => user.id), user.id],
        },
      });

      console.log('check data');
    } catch (error: any) {
      console.log('On create conversation error', error);
      toast.error(error.message);
    }
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
            {participants.length !== 0 && (
              <>
                <Participants
                  participants={participants}
                  removeParticipant={removeParticipant}
                />
                <Button
                  bg='brand.100'
                  width='100%'
                  mt={6}
                  _hover={{
                    bg: 'brand.100',
                  }}
                  onClick={onCreateConversation}
                  isLoading={createConversationLoading}
                >
                  Create Conversation
                </Button>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConversationModal;
