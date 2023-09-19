const express = require('express');
const router = express.Router();

const { addReview, getReview, getDoctorReviews,
    updateReview, deleteReview, } = require('../controllers/review.controller');

router.route('/').post(addReview);
router.route('/:reviewId').get(getReview).patch(updateReview).delete(deleteReview);
router.route('/doctor/:doctorId').get(getDoctorReviews);

module.exports = router;