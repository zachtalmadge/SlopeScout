import React, { useState } from 'react';
import { Modal, Button, Loader, Dimmer, Input } from 'semantic-ui-react';
import emailjs from '@emailjs/browser';

const EventModal = ({ sendEmail, eventName, eventTime, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    const formattedDate = `${month} ${day}, ${year}`;
    const formattedTime = `${hours}:${minutes}`;
    
    return { formattedDate, formattedTime };
}

const { formattedDate, formattedTime } = formatDateTime(eventTime)


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsValidEmail(true);
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = () => {
    if (!validateEmail()) {
      setIsValidEmail(false);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      sendEmail();
      setLoading(false);
      onClose(); // Close the modal
    }, 2000); // Spinner shows for 2 seconds
  };

  function sendEmail(){
    emailjs.send("service_fb627gb","template_tbhywff",{
        event: eventName,
        time: formattedTime,
        date: formattedDate,
        user_email: email
        }, 'Q3vqku9WBPRijR95K');
  }

  return (
    <Modal open={true} onClose={onClose}>
      <Modal.Header>Registered for {eventName}!</Modal.Header>
      <Modal.Content>
        <p>Would you like an email confirmation?</p>
        <Input
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          error={!isValidEmail}
        />
        {!isValidEmail && (
          <p style={{ color: 'red' }}>Please input a valid email</p>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose} color='red' inverted>
          No thanks
        </Button>
        <Button color='primary' onClick={handleRegister} disabled={loading}>
          {loading ? (
            <Dimmer active inverted>
              <Loader size='small'>Sending Email...</Loader>
            </Dimmer>
          ) : (
            'Send Email'
          )}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EventModal;
