import { Grid, Header, Segment, Container, Image } from 'semantic-ui-react';
import { useTheme } from '../../contexts/ThemeProvider';

const IntroBlurb = () => {

  const { theme } = useTheme();

  const segmentStyle = {
    backgroundColor: theme === 'light' ? 'white' : '#1B1C1D', // Example colors
    color: theme === 'light' ? 'black' : 'white',
    marginTop: 0,
    marginBottom: 0
  };

  return (
    <Segment style={{...segmentStyle}}>
      <Container>
        <Grid columns={2} stackable>
          <Grid.Column width={8}>
            <Header color='blue' as="h2">Welcome to SlopeScout</Header>
            <p>
            SlopeScout is an innovative and dynamic platform designed to transform your skiing experiences and explorations. It's not just about finding slopes; it's about discovering a new world of skiing adventures. Whether you're a beginner or a seasoned skier, SlopeScout offers an array of features to enhance your journey on the snow.
            </p>
            <Header color='blue' as="h2">Discover New Adventures</Header>
            <p>
            SlopeScout is your portal to a world of skiing adventures. Find diverse ski destinations, connect with like-minded enthusiasts, and share tips and stories in a vibrant community. Whether you're a novice or a pro, SlopeScout caters to all skiing interests and levels.
            </p>
          </Grid.Column>
          <Grid.Column width={8}>
            <Image src="../assets/snowboarders_placeholder.png" />
          </Grid.Column>
        </Grid>
      </Container>
    </Segment>
  );
};

export default IntroBlurb;
