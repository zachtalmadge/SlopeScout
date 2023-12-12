import React from 'react';
import { Tab, Button, Card } from 'semantic-ui-react';
import renderRatingStars from '../../util/renderRatingStars';
import DateTimeDisplay from '../DateTimeDisplay';
import sortByDate from '../../util/sortByDate';
import { useTheme } from '../../contexts/ThemeProvider';


const ResortDetailsPanes = ({ reviews, events, addToUserEvents }) => {

    const { theme } = useTheme();

    const paneStyle = {
        backgroundColor: theme === 'light' ? 'white' : '#1B1C1D', // Dark mode background
        color: theme === 'light' ? 'black' : 'white', // Dark mode text color
      };


    const reviewPanes = {
        menuItem: 'Reviews',
        render: () => (
            <Tab.Pane style={paneStyle}>
                {reviews && reviews.map((review, index) => (
                    <Card key={index}>
                        <Card.Content style={{backgroundColor: theme === 'light' ? 'white' : "#1B1C1D"}}>
                            <Card.Description style={{color: theme === 'light' ? "" : 'white'}}>{review.text}</Card.Description>
                            <hr/>
                            <p>Rating: {renderRatingStars(review.rating)}</p>
                        </Card.Content>
                    </Card>
                ))}
                <Button color="blue" style={{ marginBottom: '10px' }} inverted={theme === 'dark'}>
                    Submit a Review
                </Button>
            </Tab.Pane>
        ),
    };

    const eventPanes = {
        menuItem: 'Events',
        render: () => (
            <Tab.Pane style={paneStyle}>
                {events && sortByDate(events).map((event, index) => (
                    <Card key={index}>
                        <Card.Content style={{backgroundColor: theme === 'light' ? 'white' : "#1B1C1D"}}>
                            <Card.Header style={{color:"rgb(33,133,208)"}}>{event.event.name}</Card.Header>
                            <Card.Description style={{color: theme === 'light' ? "" : 'white'}}>{event.event.description}</Card.Description>
                        </Card.Content>
                        <Card.Content extra style={{backgroundColor: theme === 'light' ? 'white' : "#1B1C1D"}}> 
                            <DateTimeDisplay dateTimeString={event.time} theme={theme} />
                            <Button primary onClick={() => addToUserEvents(event)} inverted={theme === 'dark'}>
                                Register
                            </Button>
                        </Card.Content>
                    </Card>
                ))}
            </Tab.Pane>
        ),
    };

    const panes = [reviewPanes, eventPanes];

    return <Tab panes={panes} />;
};

export default ResortDetailsPanes;
