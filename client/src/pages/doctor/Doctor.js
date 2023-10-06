import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import './Doctor.css';
import DoctorSummary from '../../components/doctorSummary/DoctorSummary';
import newRequest from '../../utils/newRequest';
import Loader from '../../components/loader/Loader';
import Review from '../../components/review/Review';

const Doctor = () => {
  const { id } = useParams();

  // get the current user
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to the top on page load
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    // redirect to login page if user is not logged in
    if (!user || user == null) {
      navigate('/login');
    }
  }, [id]);

  // fetch doctor details
  const { isLoading, error, data } = useQuery(
    ['getDoctor', id],
    () =>
      newRequest
        .get(`/doctor/${id}`)
        .then((res) => res.data)
  );

  // Fetch doctor reviews
  const { isLoading: isLoadingReviews, error: errorReviews, data: reviewsData } = useQuery(
    ['getDoctorReviews', id],
    () => newRequest.get(`/review/doctor/${id}`).then((res) => res.data)
  );


  const renderDoctorInfo = () => {
    if (isLoading || isLoadingReviews) {
      return <Loader />;
    }

    if (error || errorReviews) {
      return <p>Failed to fetch doctor information. Please try again later.</p>;
    }

    const { about, services, qualifications, specialities } = data[0];
    console.log(reviewsData.reviews)
    return (
      <div className='container'>
        <div className='left'>
          <div className='info'>
            <DoctorSummary key={data[0]._id} doctor={data[0]} />
            <div className='moreInfo'>
              <h4>About</h4>
              <p>{about}</p>

              <h4>Services</h4>
              <ul>
                {services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>

              <h4>Qualifications</h4>
              <ul>
                {qualifications.map((qualification) => (
                  <li key={qualification}>{qualification}</li>
                ))}
              </ul>

              <h4>Specialities</h4>
              <ul>
                {specialities.map((speciality) => (
                  <li key={speciality}>{speciality}</li>
                ))}
              </ul>
            </div>
          </div>

          {reviewsData.reviews.length > 0 ? (
            <div className='reviews'>
              <h3>Reviews</h3>
              <ul>
                {reviewsData.reviews.map((review) => (
                  <li key={review.id}><Review review={review}/></li>
                ))}
              </ul>
            </div>
          ) : (
            <div>No reviews for doctor</div>
          )}

        </div>

        <div className='right'>
          <div className='booking-options'>
            <h4>Booking</h4>
            <button>Video Consultation</button>
            <button>Chat Physician</button>
            <Link to={`/booking/${data[0]._id}`}>
              <button>Book Appointment</button>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return <div className='doctor'>{renderDoctorInfo()}</div>;
};

export default Doctor;
