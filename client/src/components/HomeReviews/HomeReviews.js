import React from 'react';
import { Container, Segment, Header, Rating, Grid, Card } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../contexts/ThemeProvider';

const reviews = [
  {
    name: 'John Doe',
    rating: 5,
    content:
      'SlopeScout has completely changed the way I explore snowboarding destinations. Thanks to this app, I discovered amazing new places and even found out about awesome snowboarding events happening nearby.'
  },
  {
    name: 'Jane Smith',
    rating: 5,
    content:
      'I can\'t imagine my snowboarding adventures without SlopeScout anymore. It has made finding great spots and events a breeze. I\'m always up-to-date on the coolest snowboarding happenings!'
  },
  {
    name: 'Mike Johnson',
    rating: 5,
    content:
      'SlopeScout is a game-changer for snowboarders. It helped me explore new slopes and keep track of upcoming events. I highly recommend it to all snowboarding enthusiasts.'
  },
  {
    name: 'Emily Wilson',
    rating: 5,
    content:
      'I love SlopeScout! It made my snowboarding trips so much more exciting. I found hidden gems and learned about fantastic events. This app is a must-have for every snowboarder.'
  }
];

const HomeReviews = () => {

  const { theme } = useTheme();

  const segmentStyle = {
    backgroundColor: theme === 'light' ? 'white' : '#1B1C1D', // Example colors
    marginTop: 0,
    marginBottom: 0
  };
  
  const cardStyle = {
    backgroundColor: theme === 'light' ? 'white' : 'grey', // Adjust for cards
  };

  return (
    <Segment style={segmentStyle}>
    <Container>
      <Header color={theme === 'light' ? '' : 'blue'} as="h2" textAlign="center">
        What Our Users Say
      </Header>
      <Grid columns={2} stackable centered>
        {reviews.map((review, index) => (
          <Grid.Column key={index}>
            <Card fluid style={cardStyle}>
              <Card.Content>
                <Card.Header>
                  <FontAwesomeIcon icon={faUserCircle} style={{ marginRight: '5px' }} />
                  {review.name}
                </Card.Header>
                <Card.Description>{review.content}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Rating
                  icon="star"
                  defaultRating={review.rating}
                  maxRating={5}
                  disabled
                />
              </Card.Content>
            </Card>
          </Grid.Column>
        ))}
      </Grid>

        </Container>
    </Segment>
  );
};

export default HomeReviews;
