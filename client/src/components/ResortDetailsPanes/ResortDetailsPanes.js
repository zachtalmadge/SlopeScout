import React from 'react';
import { Tab, Button, Card } from 'semantic-ui-react';
import renderRatingStars from '../../util/renderRatingStars';
import DateTimeDisplay from '../DateTimeDisplay';
import sortByDate from '../../util/sortByDate';
import { useTheme } from '../../contexts/ThemeProvider';


const ResortDetailsPanes = ({ reviews, events }) => {

    const URL = 'http://127.0.0.1:5555/user/1/event'

    const { theme } = useTheme();

    const paneStyle = {
        backgroundColor: theme === 'light' ? 'white' : '#1B1C1D', // Dark mode background
        color: theme === 'light' ? 'black' : 'white', // Dark mode text color
      };


    const handleRegister = async (eventId) => {
        try {
            const response = await fetch(`${URL}/${eventId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                // If the response is successful, alert the user
                alert('Successfully registered for the event!');
            } else {
                // Handle non-successful responses here
                alert('Failed to register for the event.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while trying to register for the event.');
        }
    };

    const reviewPanes = {
        menuItem: 'Reviews',
        render: () => (
            <Tab.Pane style={paneStyle}>
                {reviews && reviews.map((review, index) => (
                    <Card key={index}>
                        <Card.Content style={{backgroundColor: theme === 'light' ? 'white' : "#1B1C1D"}}>
                            <Card.Description style={{color: theme === 'light' ? "" : 'white'}}>{review.text}</Card.Description>
                            <hr/>
                            <p>Rating: {renderRatingStars(review.rating)}</p>
                        </Card.Content>
                    </Card>
                ))}
                <Button color="blue" style={{ marginBottom: '10px' }} inverted={theme === 'dark'}>
                    Submit a Review
                </Button>
            </Tab.Pane>
        ),
    };

    const eventPanes = {
        menuItem: 'Events',
        render: () => (
            <Tab.Pane style={paneStyle}>
                {events && sortByDate(events).map((event, index) => (
                    <Card key={index}>
                        <Card.Content style={{backgroundColor: theme === 'light' ? 'white' : "#1B1C1D"}}>
                            <Card.Header style={{color:"rgb(33,133,208)"}}>{event.event.name}</Card.Header>
                            <Card.Description style={{color: theme === 'light' ? "" : 'white'}}>{event.event.description}</Card.Description>
                        </Card.Content>
                        <Card.Content extra style={{backgroundColor: theme === 'light' ? 'white' : "#1B1C1D"}}> 
                            <DateTimeDisplay dateTimeString={event.time} theme={theme} />
                            <Button primary onClick={() => handleRegister(event.event_id)} inverted={theme === 'dark'}>
                                Register
                            </Button>
                        </Card.Content>
                    </Card>
                ))}
            </Tab.Pane>
        ),
    };

    const panes = [reviewPanes, eventPanes];

    return <Tab panes={panes} />;
};

export default ResortDetailsPanes;
