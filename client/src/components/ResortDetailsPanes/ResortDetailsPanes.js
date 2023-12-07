import React from 'react';
import { Tab, Button, Card, Icon } from 'semantic-ui-react';
import renderRatingStars from '../../util/renderRatingStars'

const ResortDetailsPanes = ({ reviews, events }) => {

    const reviewPanes = {
        menuItem: 'Reviews',
        render: () => (
            <Tab.Pane>
                <Button primary style={{ marginBottom: '10px' }}>
                    Submit a Review
                </Button>
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
            </Tab.Pane>
        ),
    };

    const eventPanes = {
        menuItem: 'Events',
        render: () => (
            <Tab.Pane>
                {events && events.map((event, index) => (
                    <Card key={index}>
                        <Card.Content>
                            <Card.Header>{event.event.name}</Card.Header>
                            <Card.Description>{event.event.description}</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <p>Time: {event.time}</p>
                        </Card.Content>
                    </Card>
                ))}
            </Tab.Pane>
        ),
    };

    const panes = [reviewPanes, eventPanes];

    return (
        <Tab panes={panes} />
    );
};

export default ResortDetailsPanes;
