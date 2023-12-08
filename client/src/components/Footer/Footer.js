import React from 'react';
import { Container, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <Segment inverted vertical style={{ padding: '3em 0' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as="h4" inverted>
                Zachary Talmadge
              </Header>
              <p>Copyright © {new Date().getFullYear()} Zachary Talmadge. All rights reserved.</p>
            </Grid.Column>
            <Grid.Column width={8}>
              <Header as="h4" inverted>
                Coding Bootcamp Logo
              </Header>
              <p>
                <a href="#">
                  <FontAwesomeIcon icon={faFacebook} size="3x" style={{ marginRight: '10px' }} />
                </a>
                <a href="#">
                  <FontAwesomeIcon icon={faTwitter} size="3x" style={{ marginRight: '10px' }} />
                </a>
                <a href="#">
                  <FontAwesomeIcon icon={faInstagram} size="3x" style={{ marginRight: '10px' }} />
                </a>
                <a href="#">
                  <FontAwesomeIcon icon={faLinkedinIn} size="3x" style={{ marginRight: '10px' }} />
                </a>
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
};

export default Footer;
