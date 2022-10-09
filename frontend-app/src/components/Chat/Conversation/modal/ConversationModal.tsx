import { useQuery } from '@apollo/client';
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

interface IConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConversationModal: React.FC<IConversationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [username, setUsername] = React.useState('');
  const { data, loading, error } = useQuery(userOperations.Queries.searchUsers);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('ob subit');
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pb={4}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSearch}>
              <Stack spacing={4}>
                <Input
                  placeholder='search for users'
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
                <Button type='submit' disabled={!username}>
                  Search
                </Button>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConversationModal;
