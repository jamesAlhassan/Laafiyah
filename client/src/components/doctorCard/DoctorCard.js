import { Link, NavLink } from "react-router-dom";
import DoctorSummary from "../doctorSummary/DoctorSummary";
import './DoctorCard.css';

const DoctorCard = ({ doctor }) => {

    return (
        <div className="doctorCard" >
            <DoctorSummary key={doctor._id} doctor={doctor} />
            <div className="buttons">
                <Link to={`/doctor/${doctor?._id}`}>
                    <button className="mainButton">View Profile</button>
                </Link>
                <Link to={`/booking/${doctor?._id}`}>
                    <button className="outlineButton">Book Appointment</button>
                </Link>
            </div>
        </div>
    );
}

export default DoctorCard;