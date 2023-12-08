import { Modal, Button, Header } from 'semantic-ui-react';

const BookmarkModal = ({ resortName, message, open, onClose }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Header icon='bookmark' content={`Bookmark ${resortName}`} />
            <Modal.Content>
                <p>{message}</p>
            </Modal.Content>
            <Modal.Actions>
                <Button color='green' onClick={onClose}>
                    OK
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default BookmarkModal;