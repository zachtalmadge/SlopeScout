import React from 'react';
import { Card, Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../contexts/ThemeProvider';


const ResortCard = ({ resort }) => {
    const { name, city, state, description, id } = resort;

    const { theme } = useTheme();

    const cardStyle = {
        backgroundColor: theme === 'light' ? 'white' : '#1B1C1D', // Dark mode background
        color: theme === 'light' ? 'black' : 'white', // Dark mode text color
        // Add other styling as needed
      };      


      return (
        <Card style={cardStyle}>
          <Image src="./assets/resort_placeholder.png" alt={name} />
          <Card.Content>
            <Card.Header style={{color: theme === 'light' ? "black" : "rgb(33,133,208)"}}>{name}</Card.Header>
            <Card.Meta style={{color: theme === 'light' ? "black" : "silver"}}>
              <FontAwesomeIcon color="orangered" icon={faMapMarker} style={{ marginRight: '5px' }} />
              {`${city}, ${state}`}
            </Card.Meta>
            <Card.Description style={{color: theme === 'light' ? "black" : "silver"}}>{description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button as={Link} to={`/resort/${id}`} primary inverted={theme === 'dark'}>
              More Details
            </Button>
          </Card.Content>
        </Card>
      );
      
};

export default ResortCard;
