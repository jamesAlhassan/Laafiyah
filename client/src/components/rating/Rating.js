import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const RatingStars = ({ rating }) => {
    const maxStars = 5; // Maximum number of stars

    // Round the rating to the nearest half-star
    const roundedRating = Math.round(rating * 2) / 2;

    // Create an array representing each star
    const stars = Array.from({ length: maxStars }, (_, index) => {
        const isFilled = index + 0.5 <= roundedRating;
        return isFilled ? <FaStar key={index} /> : <FaRegStar key={index} />;
    });

    return <div>{stars}</div>;
};

export default RatingStars;
