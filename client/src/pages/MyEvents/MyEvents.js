import { Grid, Card, Button, Container, Image } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import ModelMasthead from "../../components/ModelMasthead/ModelMasthead";
import DateTimeDisplay from '../../components/DateTimeDisplay/DateTimeDisplay';
import { useOutletContext } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeProvider';



const MyEvents = () => {

    const { userEvents, setUserEvents } = useOutletContext()

    let renderedEvents = userEvents.map((userEvent, i) => ({...userEvent, 'id': i}))

    const handleRemoveEvent = (id) => {
        renderedEvents = renderedEvents.filter(event => event.id !== id)
        renderedEvents.forEach(event => { delete event.id})
        setUserEvents(renderedEvents)
    };

    const { theme } = useTheme();

    const cardStyle = {
        backgroundColor: theme === 'light' ? 'white' : '#1B1C1D', // Dark mode card background
        color: theme === 'light' ? 'black' : 'white', // Dark mode card text
      };
      
      const containerStyle = {
        backgroundColor: theme === 'light' ? 'white' : '#1B1C1D', // Dark mode container background
        color: theme === 'light' ? 'black' : 'white', // Dark mode container text
        paddingTop: "50px",
        paddingBottom: "50px"
      };


    return (
        <>
            <ModelMasthead text="My Events" />
            <Container fluid style={containerStyle}>
                <Container>
                    <Grid>
                        {renderedEvents.map(event => (
                            <Grid.Column key={event.id} width={4}>
                                <Card style={cardStyle}>
                                    <Image src="./assets/resort_placeholder.png" />
                                    <Card.Content>
                                        <Card.Header style={{color: theme === 'light' ? "black" : "rgb(33,133,208)"}}>
                                            {event.eventName}
                                        </Card.Header>
                                        <Card.Meta style={{color: theme === 'light' ? "black" : "silver"}}>
                                            <span>
                                                <FontAwesomeIcon color="orangered" icon={faMapMarkerAlt} /> {event.resortCity}
                                            </span>
                                        </Card.Meta>
                                        <Card.Description style={{color: theme === 'light' ? "black" : "silver"}}>
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
            </Container>
        </>
    );
};

export default MyEvents;
