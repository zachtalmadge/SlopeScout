import { Segment, Container, Header } from 'semantic-ui-react';

const ModelMasthead = ({ text }) => {
  return (
    <Segment style={{height: "125px"}} inverted vertical textAlign="center" className="masthead">
      <Container>
        <Header as="h1" style={{color: "white"}}>{text}</Header>
      </Container>
    </Segment>
  );
};

export default ModelMasthead;