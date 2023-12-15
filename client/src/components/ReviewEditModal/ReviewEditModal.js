import React, { useState, useEffect } from 'react';
import { Modal, Button, Icon, Form, Rating } from 'semantic-ui-react';

const ReviewEditModal = ({ review, editReview, open, onClose }) => {

    if (review === null){
        var review = {
            rating: 3,
            text: ''
        }
    }

    const [rating, setRating] = useState(review.rating);
    const [text, setText] = useState(review.text);

    useEffect(() => {
        let newRating = review.rating
        let newText = review.text
        setRating(newRating)
        setText(newText)
    }, [review])

    const handleSubmit = () => {
        console.log(rating, text)
        const id = review.id
        editReview({ id, rating, text });
        onClose();
    };

    console.log(review)

    return (
        <Modal open={open} onClose={onClose}>
            <Modal.Header>Edit Review</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Rating</label>
                        <Rating icon='star' defaultRating={rating} maxRating={5} onRate={(_, data) => setRating(data.rating)} />
                    </Form.Field>
                    <Form.TextArea label='Review' value={text} onChange={(e) => setText(e.target.value)} />
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' onClick={onClose}>
                    <Icon name='remove' /> Cancel
                </Button>
                <Button color='green' onClick={handleSubmit}>
                    <Icon name='checkmark' /> Save
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default ReviewEditModal;
