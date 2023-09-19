import { Link, NavLink } from "react-router-dom";
import DoctorSummary from "../doctorSummary/DoctorSummary";
import './DoctorCard.css';

const DoctorCard = () => {
    return (
        <div className="doctorCard" >
            <DoctorSummary />
            <div className="buttons">
                <Link to="/doctor">
                    <button className="mainButton">View Profile</button>
                </Link>
                <button className="outlineButton">Book Appointment</button>
            </div>
        </div>
    );
}

export default DoctorCard;