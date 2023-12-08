import React from 'react';
import { Container, Header, Icon, Image, Button, Grid, Tab, Divider } from 'semantic-ui-react';
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Icon name="map marker alternate" />
              {city}, {state}
              <Button icon color="blue" style={{ marginLeft: '10px' }}>
                <FontAwesomeIcon icon={faBookmark} style={{marginRight: "5px"}} />
                Bookmark
              </Button>
            </div>
            <Divider />
            <Image style={{ width: '80%' }} src="../assets/night_resort_placeholder.png" alt={name} />
          </Grid.Column>
          <Grid.Column width={6}>
            {resort ? <ResortDetailsPanes reviews={reviews} events={events} /> : ''}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default ResortDetailsView;
