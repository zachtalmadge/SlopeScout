import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icon } from 'semantic-ui-react';


// Helper function to generate star icons based on the rating
const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
        stars.push(<Icon color="yellow" key={i}><FontAwesomeIcon icon={faStar} /></Icon>);
    }
    return stars;
};

export default renderRatingStars