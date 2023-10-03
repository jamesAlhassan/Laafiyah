import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './Booking.css';
import DoctorSummary from "../../components/doctorSummary/DoctorSummary";
import formatDate from "../../utils/formatDate";
import newRequest from "../../utils/newRequest";
import Review from "../../components/review/Review";

const Booking = () => {
    const [availability, setAvailability] = useState([]);
    const [doctor, setDoctor] = useState({});
    const [isEmpty, setIsEmpty] = useState(false);
    const { doctorId } = useParams();

    useEffect(() => {
        fetchAvailability();
    }, [doctorId]);

    // Fetch availability data from the database when the component mounts
    const fetchAvailability = async () => {
        try {
            const res = await newRequest.get(`/availability/${doctorId}`);
            const fetchedAvailability = res.data || [];

            if (fetchedAvailability.length === 0) setIsEmpty(true);

            // Sort and set the fetched availability
            setAvailability(sortAvailability(fetchedAvailability.availability));
            setDoctor(fetchedAvailability?.doctor || {}); // Use optional chaining
            console.log(fetchedAvailability);
        } catch (error) {
            console.error('Error fetching availability:', error);
        }
    };

    function sortAvailability(data) {
        const daysOfWeekOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

        // Sort the data by day based on the custom order
        data.sort((a, b) => {
            return daysOfWeekOrder.indexOf(a.day) - daysOfWeekOrder.indexOf(b.day);
        });

        return data;
    }

    return (
        <div className="booking">
            <div className="booking-container">
                <DoctorSummary className='docSummary'
                    key={doctor?._id}
                    doctor={doctor} />
                <div className="saved-availability">
                    <h4>Availabilities:</h4>
                    {availability?.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Day</th>
                                    <th>Time Slots</th>
                                </tr>
                            </thead>
                            <tbody>
                                {availability.map((item) => (
                                    <tr key={item.day}>
                                        <td>{formatDate(item.day)}</td>
                                        <td>
                                            <ul>
                                                {item.timeslots.map((slot, index) => (
                                                    <li key={index}>
                                                        <Link
                                                            to={'/confirmbooking'}
                                                            state={{
                                                                appointment: {
                                                                    day: item.day,
                                                                    time: item.timeslots[index],
                                                                },
                                                                doctor: { ...doctor }
                                                            }}>

                                                            <button >
                                                                {slot}
                                                            </button>
                                                        </Link>
                                                    </li>

                                                ))}
                                            </ul>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No availability data.</p>
                    )}
                </div>

                <div className="review-container">
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
        </div>
    )
}

export default Booking;
