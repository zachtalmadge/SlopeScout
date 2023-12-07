import React from 'react';
import { Container, Header, Icon, Image, Button, Grid, Tab } from 'semantic-ui-react';
import ResortDetailsPanes from '../ResortDetailsPanes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

const ResortDetailsView = ({ resort }) => {
    const { name, description, state, city, reviews, events } = resort;

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
                        <ResortDetailsPanes reviews={reviews} events={events} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
};

export default ResortDetailsView;
