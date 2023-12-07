import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';

const ResortCard = ({ resort }) => {
    const { name, city, state, description, id } = resort;

    return (
        <Card>
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Meta>
                    <FontAwesomeIcon color="orangered" icon={faMapMarker} style={{ marginRight: '5px' }} />
                    {`${city}, ${state}`}
                </Card.Meta>
                <Card.Description>{description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button as={Link} to={`/resort/${id}`} primary>
                    More Details
                </Button>
            </Card.Content>
        </Card>
    );
};

export default ResortCard;
