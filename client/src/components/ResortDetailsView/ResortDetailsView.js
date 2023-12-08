import { useState } from 'react';
import { Container, Header, Icon, Image, Button, Grid, Tab, Divider } from 'semantic-ui-react';
import ResortDetailsPanes from '../ResortDetailsPanes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import BookmarkModal from '../BookmarkModal';

const URL = "http://127.0.0.1:5555/user/1/bookmark"

const ResortDetailsView = ({ resort }) => {
  const { id, name, description, state, city, reviews, events } = resort;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  console.log(events)

  const submitBookmark = async (id) => {
    try {
        const headers = {"content-type": "application/json"};
        let response = await fetch(`${URL}/${id}`, {method: "POST", headers});

        setModalOpen(true);
        if (response.status === 400) {
            setModalMessage('You have already bookmarked this resort.');
        } else if (response.status === 500) {
            setModalMessage('An error occurred. Please try again later.');
        } else if (response.ok) {
            setModalMessage(`${name} has been successfully bookmarked!`);
        } else {
            throw new Error('Unexpected error occurred');
        }
    } catch (error) {
        setModalOpen(true);
        setModalMessage(error.message);
    }
};

  return (
    <>
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
            <BookmarkModal
                resortName={name}
                message={modalMessage}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            />
    </Container>
    </>
  );
};

export default ResortDetailsView;
