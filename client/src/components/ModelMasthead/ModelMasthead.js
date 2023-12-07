import { Segment, Container, Header } from 'semantic-ui-react';

const ModelMasthead = ({ text }) => {
  return (
    <Segment inverted vertical textAlign="center" className="masthead">
      <Container>
        <Header as="h1">{text}</Header>
      </Container>
    </Segment>
  );
};

export default ModelMasthead;