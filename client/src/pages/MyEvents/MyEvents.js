import React, { useState, useEffect } from 'react';
import { Grid, Card, Button, Container, Image } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import ModelMasthead from "../../components/ModelMasthead/ModelMasthead";
import DateTimeDisplay from '../../components/DateTimeDisplay/DateTimeDisplay';

const MyEvents = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5555/user/1/event/1')
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const handleRemoveEvent = async (eventId) => {
        try {
            const response = await fetch(`http://127.0.0.1:5555/user/1/event/${eventId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setEvents(events.filter(event => event.id !== eventId));
            } else {
                console.error('Failed to remove the event');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <ModelMasthead text="My Events" />
            <Container>
                <Grid>
                    {events.map(event => (
                        <Grid.Column key={event.id} width={4}>
                            <Card>
                                <Image src="./assets/resort_placeholder.png" />
                                <Card.Content>
                                    <Card.Header>
                                        {event.event.name}
                                    </Card.Header>
                                    <Card.Meta>
                                        <span>
                                            <FontAwesomeIcon icon={faMapMarkerAlt} /> {event.resort.name}
                                        </span>
                                    </Card.Meta>
                                    <Card.Description>
                                        <DateTimeDisplay dateTimeString={event.time} />
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Button color='red' onClick={() => handleRemoveEvent(event.id)}>
                                        Remove Event
                                    </Button>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default MyEvents;
