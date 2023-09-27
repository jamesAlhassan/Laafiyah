import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import DoctorSummary from '../../components/doctorSummary/DoctorSummary';
import './Doctor.css';
import Review from '../../components/review/Review';

const Doctor = () => {
  const { id } = useParams();

  useEffect(() => {
    // Scroll to the top on page load
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [id]);

  const { isLoading, error, data } = useQuery(
    ['getDoctor', id],
    () =>
      newRequest
        .get(`/doctor/${id}`)
        .then((res) => res.data)
  );

  const renderDoctorInfo = () => {
    if (isLoading) {
      return 'Loading';
    }
    if (error) {
      return 'Something went wrong!';
    }
    const doctor = data[0];

    return (
      <div className='container'>
        <div className='left'>
          <div className='info'>
            <DoctorSummary key={doctor?._id} doctor={doctor} />
            <div className='moreInfo'>
              <h4>About</h4>
              <p>{doctor?.about}</p>

              <h4>Services</h4>
              <ul>
                {doctor?.services?.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>

              <h4>Qualifications</h4>
              <ul>
                {doctor?.qualifications?.map((qualification) => (
                  <li key={qualification}>{qualification}</li>
                ))}
              </ul>

              <h4>Specialities</h4>
              <ul>
                {doctor?.specialities?.map((speciality) => (
                  <li key={speciality}>{speciality}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className='reviews'>
            <h3>Reviews</h3>
            <ul>
              <li>
                <Review />
              </li>
              <li>
                <Review />
              </li>
              <li>
                <Review />
              </li>
              <li>
                <Review />
              </li>
              <li>
                <Review />
              </li>
            </ul>
          </div>
        </div>

        <div className='right'>
          <div className='booking-options'>
            <h4>Booking</h4>
            <button>Video Consultation</button>
            <button>Chat Physician</button>
            <Link to={`/booking/${doctor._id}`}>
              <button>Book Appointment</button>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='doctor'>
      {renderDoctorInfo()}
    </div>
  );
};

export default Doctor;
