import React from 'react';
import { Container, Header, Button, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

const Masthead = () => {
    return (
        <Segment inverted textAlign="center" vertical className="masthead" padded="very">
            <Container text>
                <Header as='h1' inverted size="huge">
                    SlopeScout
                </Header>
                <p style={{ fontSize: '1.5em' }}>Welcome to SlopeScout, your ultimate guide to ski resorts and events. Discover the best slopes and make your skiing experience unforgettable.</p>
                <Button primary as={Link} to="/allresorts" size="large">
                    Explore Resorts
                </Button>
            </Container>
        </Segment>
    );
};

export default Masthead;
