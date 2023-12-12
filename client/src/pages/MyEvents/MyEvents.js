import React, { useState, useEffect } from 'react';
import { Grid, Card, Button, Container, Image } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import ModelMasthead from "../../components/ModelMasthead/ModelMasthead";
import DateTimeDisplay from '../../components/DateTimeDisplay/DateTimeDisplay';
import { useOutletContext } from 'react-router-dom';


const MyEvents = () => {

    const { userEvents, setUserEvents } = useOutletContext()

    console.log(userEvents)

    let renderedEvents = userEvents.map((userEvent, i) => ({...userEvent, 'id': i}))

    console.log(renderedEvents)

    const handleRemoveEvent = (id) => {
        renderedEvents = renderedEvents.filter(event => event.id !== id)
        renderedEvents.forEach(event => { delete event.id})
        setUserEvents(renderedEvents)
    };

    return (
        <>
            <ModelMasthead text="My Events" />
            <Container>
                <Grid>
                    {renderedEvents.map(event => (
                        <Grid.Column key={event.id} width={4}>
                            <Card>
                                <Image src="./assets/resort_placeholder.png" />
                                <Card.Content>
                                    <Card.Header>
                                        {event.eventName}
                                    </Card.Header>
                                    <Card.Meta>
                                        <span>
                                            <FontAwesomeIcon icon={faMapMarkerAlt} /> {event.resortCity}
                                        </span>
                                    </Card.Meta>
                                    <Card.Description>
                                        <DateTimeDisplay dateTimeString={event.eventTime}/>
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
