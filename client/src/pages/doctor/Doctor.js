import DoctorSummary from '../../components/doctorSummary/DoctorSummary';
import './Doctor.css';
import Review from '../../components/review/Review';
import { useEffect } from 'react';

const Doctor = () => {

    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className='doctor'>
            <div className='container'>
                <div className="left">
                    <div className='info'>
                        <DoctorSummary />
                        <div className='moreInfo'>
                            <h4>About</h4>
                            <p>
                                Dr. K B Shilpashree is a Dentist,Preventive Dentistry and Public Health Dentist in JP Nagar 7 Phase, Bangalore and has an experience of 21 years in these fields. Dr. K B Shilpashree practices at Dental Profiles Clinic in JP Nagar 7 Phase, Bangalore,Dental Profiles in Bellandur, Bangalore and Dental Profiles in JP Nagar 5 Phase, Bangalore. She completed BDS from The Oxford dental College, Bangalore in 2002 and MDS - Community Dentistry from The Oxford dental College, Bangalore in 2008.

                                She is a member of Indian Dental Association and Indian Association of Public Health Dentistry. Some of the services provided by the doctor are: Dental Checkup (General),Dental Sleep Medicine (Snoring and Sleep Apnea Management),Composite Bondings,Partial Denture (Metal Based) and Oral Surgery Procedures etc.
                            </p>
                            <h4>Services</h4>
                            <ul>
                                <li>Endrocology And laser Surgery</li>
                                <li>Radical Prostectomy</li>
                                <li>General Consultation</li>
                                <li>Surgery</li>
                            </ul>

                            <h4>Education</h4>
                            <ul>
                                <li>KATH</li>
                                <li>KBTH</li>
                            </ul>

                            <h4>Specialization</h4>
                            <ul>
                                <p>2009 - Present KBTH</p>
                            </ul>

                        </div>
                    </div>

                    <div className="reviews">
                        <h3>Reviews</h3>
                        <ul>
                            <li><Review /></li>
                            <li><Review /></li>
                            <li><Review /></li>
                            <li><Review /></li>
                            <li><Review /></li>
                        </ul>
                    </div>
                </div>

                <div className="right">
                    <div className='booking'>
                        <h4>Booking</h4>
                        <button>Video Consultation</button>
                        <button>Chat Physician</button>
                        <button>Book Appointment</button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Doctor;