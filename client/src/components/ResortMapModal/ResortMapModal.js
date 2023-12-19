import { Modal, Image, Button } from 'semantic-ui-react';

const ResortMapModal = ({ resort_map, isOpen, onClose }) => {
    return (
        <Modal open={isOpen} onClose={onClose}>
            <Modal.Header>Resort Map</Modal.Header>
            <Modal.Content image>
                <Image style={{ width: "100%" }} src={resort_map} wrapped />
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={onClose} primary>
                    Close
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default ResortMapModal;