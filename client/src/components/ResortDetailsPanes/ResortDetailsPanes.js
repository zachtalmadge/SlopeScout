import { useState, useEffect } from 'react';
import { Tab, Button, Card, Icon } from 'semantic-ui-react';
import renderRatingStars from '../../util/renderRatingStars';
import DateTimeDisplay from '../DateTimeDisplay';
import sortByDate from '../../util/sortByDate';
import { useTheme } from '../../contexts/ThemeProvider';
import EventModal from '../EventModal/EventModal';

const ResortDetailsPanes = ({ reviews, events, addToUserEvents }) => {

    if (reviews === undefined) {
        reviews = []
    }

    const URL = 'http://127.0.0.1:5555/resort/reviews';

    const { theme } = useTheme();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ resortReviews, setResortReviews ] = useState(reviews)

    console.log(reviews)

    useEffect(() => {
        // initial render has reviews at null so component must rerender when data comes in
        let newReviews = [...reviews]
        setResortReviews(newReviews)
    }, [reviews])

    const deleteReview = async (review) => {
        console.log(review)
        const data = {
            id: review.id,
            resort_id: review.resort_id
        }
        const body = JSON.stringify(data)
        const headers = {"content-type": "application/json"}
        let response = await fetch(`${URL}`, {method: "DELETE", headers, body})
        if (response.ok){
            let newReviews = resortReviews.filter(reviewID => reviewID.id !== review.id)
            setResortReviews(newReviews)
        } else {
            alert('there was a problem')
        }
    }

    const handleEventClick = (event) => {
        addToUserEvents(event);
        setIsModalOpen(true);
    }

    const paneStyle = {
        backgroundColor: theme === 'light' ? 'white' : '#1B1C1D',
        color: theme === 'light' ? 'black' : 'white',
    };

    const reviewPanes = {
        menuItem: 'Reviews',
        render: () => (
            <Tab.Pane style={paneStyle}>
                {resortReviews ? resortReviews.map((review, index) => (
                    <Card key={index}>
                        <Card.Content style={{ backgroundColor: theme === 'light' ? 'white' : "#1B1C1D" }}>
                            <Card.Description style={{ color: theme === 'light' ? "" : 'white' }}>{review.text}</Card.Description>
                            <hr />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p>Rating: {renderRatingStars(review.rating)}</p>
                                <div>
                                    <Button onClick={() => deleteReview(review)} icon color="grey" inverted={theme === 'dark'}>
                                        <Icon name="trash" />
                                    </Button>
                                    <Button icon color="grey" inverted={theme === 'dark'}>
                                        <Icon name="pencil" />
                                    </Button>
                                </div>
                            </div>
                        </Card.Content>
                    </Card>
                )): ""}
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
                    <>
                        <Card key={index}>
                            <Card.Content style={{ backgroundColor: theme === 'light' ? 'white' : "#1B1C1D" }}>
                                <Card.Header style={{ color: "rgb(33,133,208)" }}>{event.event.name}</Card.Header>
                                <Card.Description style={{ color: theme === 'light' ? "" : 'white' }}>{event.event.description}</Card.Description>
                            </Card.Content>
                            <Card.Content extra style={{ backgroundColor: theme === 'light' ? 'white' : "#1B1C1D" }}>
                                <DateTimeDisplay dateTimeString={event.time} theme={theme} />
                                <Button primary onClick={() => handleEventClick(event)} inverted={theme === 'dark'}>
                                    Register
                                </Button>
                            </Card.Content>
                        </Card>
                        {isModalOpen && (
                            <EventModal
                                addToUserEvents={addToUserEvents}
                                eventName={event.event.name}
                                eventTime={event.time}
                                onClose={() => setIsModalOpen(false)}
                            />
                        )}
                    </>
                ))}
            </Tab.Pane>
        ),
    };

    const panes = [reviewPanes, eventPanes];

    return <Tab panes={panes} />;
};

export default ResortDetailsPanes;
