import './Review.css';
import formatDate from '../../utils/formatDate';
import RatingStars from '../rating/Rating';

const Review = ({ review }) => {
    return (
        <div className='review'>
            <h4>{review.title}</h4>
            <RatingStars rating={review.rating} />
            <p>{review.content}</p>
            <div className='subscript'>
                <p>{formatDate(review.createdAt)}</p>
                <p>{review.patient.firstName} {review.patient.lastName}</p>
            </div>
        </div>
    );
}

export default Review;