import React from 'react';
import { Tab, Button, Card } from 'semantic-ui-react';
import renderRatingStars from '../../util/renderRatingStars';
import DateTimeDisplay from '../DateTimeDisplay';
import sortByDate from '../../util/sortByDate';

const ResortDetailsPanes = ({ reviews, events }) => {

    console.log(events)

    const URL = 'http://127.0.0.1:5555/user/1/event'

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
                let data = await response.json()

                console.log(data)
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
            <Tab.Pane>
                {reviews && reviews.map((review, index) => (
                    <Card key={index}>
                        <Card.Content>
                            <Card.Description>{review.text}</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <p>Rating: {renderRatingStars(review.rating)}</p>
                        </Card.Content>
                    </Card>
                ))}
                <Button grey="true" style={{ marginBottom: '10px' }}>
                    Submit a Review
                </Button>
            </Tab.Pane>
        ),
    };

    const eventPanes = {
        menuItem: 'Events',
        render: () => (
            <Tab.Pane>
                {events && sortByDate(events).map((event, index) => (
                    <Card key={index}>
                        <Card.Content>
                            <Card.Header>{event.event.name}</Card.Header>
                            <Card.Description>{event.event.description}</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <DateTimeDisplay dateTimeString={event.time} />
                            <Button primary onClick={() => handleRegister(event.event_id)}>
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
