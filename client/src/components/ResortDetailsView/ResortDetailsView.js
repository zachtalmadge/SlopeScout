import React from 'react';
import { Container, Header, Icon, Image, Button, Grid, Tab, Divider } from 'semantic-ui-react';
import ResortDetailsPanes from '../ResortDetailsPanes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

const ResortDetailsView = ({ resort }) => {
  const { id, name, description, state, city, reviews, events } = resort;

  const submitBookmark = async (id) => {

    const headers = {"content-type": "application/json"}

    let response = await fetch(`http://127.0.0.1:5555/user/1/bookmark/${id}`, {method: "POST", headers})
    let bookmark = await response.json()
    console.log(bookmark)
  }

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
              <Button onClick={() => submitBookmark(id)} icon color="blue" style={{ marginLeft: '10px' }}>
                <FontAwesomeIcon icon={faBookmark} style={{ marginRight: "5px" }} />
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
