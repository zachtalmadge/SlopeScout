import { Grid, Header, Segment, Container } from 'semantic-ui-react';

const IntroBlurb = () => {
  return (
    <Segment>
      <Container>
        <Grid columns={2} stackable>
          <Grid.Column width={8}>
            <Header as="h2">Welcome to SlopeScout</Header>
            <p>
              SlopeScout is an exciting platform that revolutionizes the way you explore and experience the world of slopes and skiing.
            </p>
            <Header as="h2">Discover New Adventures</Header>
            <p>
              With SlopeScout, you can discover new skiing adventures, connect with fellow enthusiasts, and share your experiences with the community.
            </p>
          </Grid.Column>``
          <Grid.Column width={8}>
            <p>
              Placeholder text goes here. You can replace this with any content or components you'd like to display in the second column.
            </p>
          </Grid.Column>
        </Grid>
      </Container>
    </Segment>
  );
};

export default IntroBlurb;
