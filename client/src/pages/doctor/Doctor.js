import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import DoctorSummary from '../../components/doctorSummary/DoctorSummary';
import './Doctor.css';
import Review from '../../components/review/Review';
import { useEffect } from 'react';
import { useParams } from "react-router-dom";

const Doctor = () => {

    const { id } = useParams();

    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: [],
        queryFn: () =>
            newRequest.get(
                `/doctor/${id}`
            ).then((res) => {
                console.log("Doctor: ", res.data)
                console.log("services", res.data[0].services)
                return res.data;
            }),
    });

    // when page is loading
    if (isLoading) return <div>Loading</div>;

    // when there is an error
    if (error) return <div>An eror has occured</div>

    return (
        <div className='doctor'>
            <div className='container'>
                <div className="left">
                    <div className='info'>
                        <DoctorSummary key={data[0]?._id} doctor={data[0]} />
                        <div className='moreInfo'>
                            <h4>About</h4>
                            <p>{data[0]?.about}</p>

                            <h4>Services</h4>
                            <ul>
                                {data[0]?.services?.map((service) => 
                                    <li>{service}</li>
                                )}
                            </ul>

                            <h4>Qualifications</h4>
                            <ul>
                                {data[0]?.qualifications?.map((qualification) =>
                                    <li>{qualification}</li>
                                )}
                            </ul>

                            <h4>specialities</h4>
                            <ul>
                                {data[0]?.specialities?.map((speciality) =>
                                    <li>{speciality}</li>
                                )}
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