import React from 'react';
import { Container, Header, Button, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

const Masthead = () => {
    const mastheadStyle = {
        backgroundImage: 'url(./assets/home_masthead.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: "50vh",
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
        <Segment inverted textAlign="center" vertical className="masthead" padded="very" style={mastheadStyle}>
            <Container text style={containerStyle}>
                <Header as='h1' inverted size="huge">
                    SlopeScout
                </Header>
                <p style={{ fontSize: '1.5em' }}>
                    Welcome to SlopeScout, your ultimate guide to ski resorts and events. Discover the best slopes and make your skiing experience unforgettable.
                </p>
                <Button color="white" as={Link} to="/allresorts" size="large">
                    Explore Resorts
                </Button>
            </Container>
        </Segment>
    );
};

export default Masthead;
