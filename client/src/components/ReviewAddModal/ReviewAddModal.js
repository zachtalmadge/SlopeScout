import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Rating, TextArea, Loader } from 'semantic-ui-react';

const ReviewAddModal = ({ addReview, open, onClose }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      // Reset form state when the modal closes
      setRating(0);
      setReviewText('');
      setIsValid(true);
      setIsSubmitting(false);
    }
  }, [open]);

  const handleSubmit = () => {
    if (!rating || !reviewText.match(/^[a-zA-Z0-9\s.,'!?-]+$/)) {
      setIsValid(false);
      return;
    }

    setIsSubmitting(true); // Start showing the spinner

    // Simulate an asynchronous operation (replace with your actual API call)
    setTimeout(() => {
      addReview({ rating, text: reviewText });
      setIsSubmitting(false); // Hide the spinner
      onClose();
    }, 2000); // Delay for 2 seconds before closing the modal
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>Add Review</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Rating</label>
            <Rating
              icon='star'
              rating={rating}
              maxRating={5}
              onRate={(_, data) => setRating(data.rating)}
            />
          </Form.Field>
          <Form.Field>
            <label>Review</label>
            <TextArea
              placeholder='Write your review here...'
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </Form.Field>
          {!isValid && (
            <p style={{ color: 'red' }}>Please provide a valid rating and review text.</p>
          )}
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button color='green' onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? <Loader active inline size='tiny' /> : 'Submit Review'}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ReviewAddModal;
