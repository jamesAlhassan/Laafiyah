import React, { useState } from 'react';
import './ReviewModal.css';

const ReviewModal = ({ setReviewContent, onClose, onAddReview }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate and submit the review
        if (title && content && rating >= 1 && rating <= 5) {
            onAddReview({ title, content, rating });
            onClose();
        } else {
            // Handle validation error
            alert('Please fill in all fields and select a valid rating.');
        }
    };

    // close the modal
    const handleClose = () => onClose();

    return (
        <div className="modal fade reviewModal" id="reviewModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Write a Review</h5>
                        <button type="button" className="btn-close" onClick={handleClose}>X</button>
                    </div>
                    <div className="modal-body">
                        {/* Review Form */}
                        <form onSubmit={handleSubmit}>
                            {/* Title Input */}
                            <div className="mb-3">
                                <label htmlFor="reviewTitle" className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="reviewTitle"
                                    placeholder="Enter a title for your review"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            {/* Content Input */}
                            <div className="mb-3">
                                <label htmlFor="reviewContent" className="form-label">Content</label>
                                <textarea
                                    className="form-control"
                                    id="reviewContent"
                                    rows="3"
                                    placeholder="Write your review"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                ></textarea>
                            </div>

                            {/* Rating Input */}
                            <div className="mb-3">
                                <label htmlFor="reviewRating" className="form-label">Rating</label>
                                <select
                                    className="form-select"
                                    id="reviewRating"
                                    value={rating}
                                    onChange={(e) => setRating(Number(e.target.value))}
                                >
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <option key={value} value={value}>{value}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="btn btn-primary">Submit Review</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReviewModal;