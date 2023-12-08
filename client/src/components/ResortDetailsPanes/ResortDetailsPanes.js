import React from 'react';
import { Tab, Button, Card } from 'semantic-ui-react';
import renderRatingStars from '../../util/renderRatingStars';
import DateTimeDisplay from '../DateTimeDisplay';
import sortByDate from '../../util/sortByDate';

const ResortDetailsPanes = ({ reviews, events }) => {


    const handleRegister = (eventId) => {
        // Add logic to handle event registration here
        console.log(`Registered for event with ID: ${eventId}`);
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
                <Button grey style={{ marginBottom: '10px' }}>
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
                            <Button primary onClick={() => handleRegister(event.event.id)}>
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
