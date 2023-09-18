import DoctorCard from "../../components/doctorCard/DoctorCard";
import "./AllDoctors.css";

const AllDoctors = () => {
    return (
        <div className="allDoctors">
            <ul>
                <li><DoctorCard /></li>
                <li><DoctorCard /></li>
                <li><DoctorCard /></li>
                <li><DoctorCard /></li>
                <li><DoctorCard /></li>
            </ul>
        </div>
    );
}

export default AllDoctors;