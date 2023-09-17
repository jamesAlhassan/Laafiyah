const Review = require('../models/review.model');
const Patient = require('../models/patient.model');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, UnauthenticatedError } = require('../errors');


const addReview = async (req, res) => {
    // get user Id
    const { id } = req.user;
    const body = req.body;

    // get patient using id
    const patient = await Patient.findOne({ user: id });
    if (!patient || patient === null) throw new NotFoundError('You can not add a review');

    // check if patient has already reviewed the doctor
    const checkReview = await Review.findOne({ doctor: body.doctor, patient: patient._id });
    if (checkReview) throw new UnauthenticatedError('You can not add another review for this doctor');

    // add patient id to the body
    body.patient = patient._id;

    const review = await Review.create(body);
    res.status(StatusCodes.CREATED).json({ review });
}

const getReview = async (req, res) => {

    const review = await Review.findById({ _id: req.params.reviewId });
    if (!review) throw new NotFoundError('Review not found');
    res.status(StatusCodes.OK).send({ review });
}

const getDoctorReviews = async (req, res) => {
    // get all reviews for a particular doctor
    const reviews = await Review.find({ doctor: req.params.doctorId });
    if (!reviews) throw new NotFoundError('No reveiws found for this doctor');
    res.status(StatusCodes.OK).send({ reviews, count: reviews.length });
}

const updateReview = async (req, res) => {
    const reviewId = req.params.reviewId;

    const review = await Review.findById({ _id: reviewId }).populate('patient');
    if (!review) throw new NotFoundError('Review not found');

    // make sure the patient has right to update the review
    if (review.patient.user.toString() !== req.user.id)
        throw new UnauthenticatedError('You can not update this review');

    const updatedReview = await Review.findByIdAndUpdate(
        { _id: reviewId },
        req.body,
        { new: true, runValidators: true }
    );
    res.status(StatusCodes.OK).json({ updatedReview });
}

const deleteReview = async (req, res) => {
    const reviewId = req.params.reviewId;

    const review = await Review.findById({ _id: reviewId }).populate('patient');
    if (!review) throw new NotFoundError('Review not found');

    // make sure the patient has right to update the review
    if (review.patient.user.toString() !== req.user.id)
        throw new UnauthenticatedError('You can not delete this review');

    const deletedReview = await Review.findByIdAndDelete({ _id: reviewId })

    res.status(StatusCodes.OK).send({ deletedReview });
}

module.exports = {
    addReview,
    getReview,
    getDoctorReviews,
    updateReview,
    deleteReview,
}