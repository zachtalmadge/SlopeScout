import { useState, useEffect } from 'react';
import { Tab, Button, Card, Icon, Pagination } from 'semantic-ui-react';
import renderRatingStars from '../../util/renderRatingStars';
import DateTimeDisplay from '../DateTimeDisplay';
import sortByDate from '../../util/sortByDate';
import { useTheme } from '../../contexts/ThemeProvider';
import EventModal from '../EventModal/EventModal';
import ReviewEditModal from '../../components/ReviewEditModal';
import ReviewAddModal from '../ReviewAddModal/ReviewAddModal';

const ResortDetailsPanes = ({ events, addToUserEvents, resort_id }) => {
    const URL = 'http://127.0.0.1:5555/resort/reviews';
    const { theme } = useTheme();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [resortReviews, setResortReviews] = useState([]);

    // States for edit review modal
    const [modalOpen, setModalOpen] = useState(false);
    const [currentReview, setCurrentReview] = useState(null);

    // State for adding review modal
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    // Pagination state for reviews
    const [currentReviewPage, setCurrentReviewPage] = useState(1);
    const reviewsPerPage = 5;

    // Pagination state for events
    const [currentEventPage, setCurrentEventPage] = useState(1);
    const eventsPerPage = 4;

    const handleOpenReviewModal = () => {
        setIsReviewModalOpen(true);
    };

    const handleCloseReviewModal = () => {
        setIsReviewModalOpen(false);
    };

    const handleEditClick = (review) => {
        setCurrentReview(review);
        setModalOpen(true);
    };

    useEffect(() => {
        (async () => {
            let response = await fetch(`${URL}/${resort_id}`)
            if (response.ok) {
                let reviews = await response.json();
                setResortReviews(reviews);
            }
        })();
    }, [resort_id]);

    const deleteReview = async (review) => {
        const data = { id: review.id };
        const body = JSON.stringify(data);
        const headers = { "content-type": "application/json" };
        let response = await fetch(`${URL}`, { method: "DELETE", headers, body });
        if (response.ok) {
            let newReviews = resortReviews.filter(reviewID => reviewID.id !== review.id);
            setResortReviews(newReviews);
        } else {
            alert('There was a problem');
        }
    };

    const addReview = async (review) => {
        let newReview = { ...review, resort_id };
        const body = JSON.stringify(newReview);
        const headers = { "content-type": "application/json" };
        let response = await fetch(URL, { method: "POST", headers, body });
        if (response.ok) {
            newReview = await response.json();
            setResortReviews(resortReviews => [...resortReviews, newReview]);
        } else {
            alert('There was an issue');
        }
    };

    const editReview = async (editedReview) => {
        const body = JSON.stringify(editedReview);
        const headers = { "content-type": "application/json" };
        let response = await fetch(URL, { method: "PUT", headers, body });
        if (response.ok) {
            const newReviews = resortReviews.filter(review => review.id !== editedReview.id);
            setResortReviews([...newReviews, editedReview]);
        } else {
            alert('There has been an error');
        }
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const paneStyle = {
        backgroundColor: theme === 'light' ? 'white' : '#1B1C1D',
        color: theme === 'light' ? 'black' : 'white',
    };

    const paginateReviews = (pageNumber) => {
        setCurrentReviewPage(pageNumber);
    };

    const paginateEvents = (pageNumber) => {
        setCurrentEventPage(pageNumber);
    };

    const reviewPanes = {
        menuItem: 'Reviews',
        render: () => (
            <Tab.Pane style={paneStyle}>
                {resortReviews.slice((currentReviewPage - 1) * reviewsPerPage, currentReviewPage * reviewsPerPage).map(review => (
                    <Card key={review.id}>
                        <Card.Content style={{ backgroundColor: theme === 'light' ? 'white' : "#1B1C1D" }}>
                            <Card.Description style={{ color: theme === 'light' ? "" : 'white' }}>{review.text}</Card.Description>
                            <hr />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p>Rating: {renderRatingStars(review.rating)}</p>
                                <div>
                                    <Button onClick={() => deleteReview(review)} icon color="grey" inverted={theme === 'dark'}>
                                        <Icon name="trash" />
                                    </Button>
                                    <Button onClick={() => handleEditClick(review)} icon color="grey" inverted={theme === 'dark'}>
                                        <Icon name="pencil" />
                                    </Button>
                                </div>
                            </div>
                        </Card.Content>
                    </Card>
                ))}
                <Button onClick={handleOpenReviewModal} color="blue" style={{ marginBottom: '10px' }} inverted={theme === 'dark'}>
                    Submit a Review
                </Button>
                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    <Pagination
                        activePage={currentReviewPage}
                        onPageChange={(e, { activePage }) => paginateReviews(activePage)}
                        totalPages={Math.ceil(resortReviews.length / reviewsPerPage)}
                        ellipsisItem={null}
                        firstItem={null}
                        lastItem={null}
                        prevItem={null}
                        nextItem={null}
                    />
                </div>
                <ReviewEditModal
                    review={currentReview}
                    editReview={editReview}
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                />
                <ReviewAddModal
                    addReview={addReview}
                    open={isReviewModalOpen}
                    onClose={handleCloseReviewModal}
                />
            
            </Tab.Pane>
        ),
    };
    
    const eventPanes = {
        menuItem: 'Events',
        render: () => (
            <Tab.Pane style={paneStyle}>
                {sortByDate(events).slice((currentEventPage - 1) * eventsPerPage, currentEventPage * eventsPerPage).map((event, index) => (
                    <Card key={event.id}>
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
                ))}
                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    <Pagination
                        activePage={currentEventPage}
                        onPageChange={(e, { activePage }) => paginateEvents(activePage)}
                        totalPages={Math.ceil(events.length / eventsPerPage)}
                        ellipsisItem={null}
                        firstItem={null}
                        lastItem={null}
                        prevItem={null}
                        nextItem={null}
                    />
                </div>
                {isModalOpen && selectedEvent && (
                    <EventModal
                        addToUserEvents={addToUserEvents}
                        eventName={selectedEvent.event.name}
                        eventTime={selectedEvent.time}
                        onClose={() => setIsModalOpen(false)}
                    />
                )}
            </Tab.Pane>
        ),
    };
    

    const panes = [reviewPanes, eventPanes];

    return <Tab panes={panes} />;
};

export default ResortDetailsPanes;
