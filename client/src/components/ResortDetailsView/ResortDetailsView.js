import React from 'react';
import { Container, Header, Icon, Image, Button, Grid, Tab } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

const ResortDetailsView = ({ resort }) => {
    const { name, description, state, city, reviews, events } = resort;

    const panes = [
        {
            menuItem: 'Reviews',
            render: () => (
                <Tab.Pane>
                    {reviews && reviews.map((review, index) => (
                        <div key={index}>
                            <p>{review.text}</p>
                            <p>Rating: {review.rating}</p>
                        </div>
                    ))}
                </Tab.Pane>
            ),
        },
        {
            menuItem: 'Events',
            render: () => (
                <Tab.Pane>
                    {events && events.map((event, index) => (
                        <div key={index}>
                            <p>{event.event.name}</p>
                            <p>Description: {event.event.description}</p>
                            <p>Time: {event.time}</p>
                        </div>
                    ))}
                </Tab.Pane>
            ),
        },
    ];

    return (
        <Container>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                        <Header as="h1">{name}</Header>
                        <p>{description}</p>
                        <p>
                            <Icon name="map marker alternate" />
                            {city}, {state}
                        </p>
                        {/* Placeholder for an image */}
                        <Image
                            src="https://via.placeholder.com/300x200" // Replace with actual image source
                            alt={name}
                        />
                        <Button icon color="blue">
                            <FontAwesomeIcon icon={faBookmark} />
                            Bookmark
                        </Button>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Tab panes={panes} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
};

export default ResortDetailsView;
