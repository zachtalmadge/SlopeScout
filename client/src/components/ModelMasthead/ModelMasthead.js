import { Segment, Container, Header } from 'semantic-ui-react';

const ModelMasthead = ({ text }) => {
  const mastheadStyle = {
    height: "125px",
    backgroundImage: 'url(./assets/model_masthead.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: "40vh",
    color: 'white', // Adjust text color for visibility
    textShadow: '0px 0px 8px rgba(0, 0, 0, 0.8)' // Optional text shadow for better readability
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  };

  return (
    <Segment inverted vertical textAlign="center" className="masthead" style={mastheadStyle}>
      <Container style={containerStyle}>
        <Header as="h1" style={{ color: "white" }}>{text}</Header>
      </Container>
    </Segment>
  );
};

export default ModelMasthead;
