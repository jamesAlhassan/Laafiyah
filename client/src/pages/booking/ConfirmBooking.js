import DoctorSummary from "../../components/doctorSummary/DoctorSummary";
import './ConfirmBooking.css';

const ConfirmBooking = () => {
    const doctorData = {
        "_id": {
            "$oid": "65110e1049d46e1d383e6a76"
        },
        "user": {
            "$oid": "65110e1049d46e1d383e6a73"
        },
        "title": "Dr ",
        "firstName": "Barbara",
        "lastName": "Nixon",
        "dateOfBirth": {
            "$date": "2012-12-13T00:00:00.000Z"
        },
        "gender": "female",
        "phoneNumber": "+1 (823) 443-2697",
        "location": "Expedita ut magnam v",
        "specialities": [
            "Qui",
            "quia",
            "quisquam",
            "do"
        ],
        "services": [
            "Quae omnis et beatae",
            "Quae omnis et beatae",
            "Quae omnis et beatae",
            "Quae omnis et beatae"
        ],
        "qualifications": [
            "Adipisicing",
            "consecte"
        ],
        "licenseNumber": "295",
        "hospitalAffiliation": "Natus quasi quas max",
        "about": "Id explicabo Ducimu Quae omnis et beatae Quae omnis et beatae Quae omnis et beatae Quae omnis et beataeQuae omnis et beataeQuae omnis et beatae Quae omnis et beatae",
        "createdAt": {
            "$date": "2023-09-25T04:33:47.937Z"
        },
        "updatedAt": {
            "$date": "2023-09-25T04:33:47.937Z"
        },
        "__v": 0
    }

    const handleContinue = (e) => {
        console.log("Continue my friend");
    }
    return (
        <div className="confirm-booking">
            <div className="confirm-booking-container">
                <div className="booking-details">
                    <li><h4>In Clinic Appointment</h4></li>
                    <li>
                        <p>On Monday <br />
                            Change Date & Time</p>
                        <p>at 5:00PM</p>
                    </li>
                    <li>
                        <DoctorSummary key={doctorData._id} doctor={doctorData} />
                    </li>
                </div>

                <div className="enter-phone">

                    <form onSubmit={(e) => e.preventDefault()}>
                        <h4>Enter phone Number</h4>
                        {/* Phone Number */}
                        <label htmlFor="phone">Phone number</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            placeholder="enter phone number"
                            required
                        />
                        {/* Addtional info */}
                        <label htmlFor="add-info">Add any addtional information</label>
                        <textarea
                            type="text"
                            id="add-info"
                            name="add-info"
                            rows="8"
                            cols="50"
                            placeholder='Add any addtional Info'>
                        </textarea><br />
                        <button type="button" onClick={handleContinue}>
                            Continue
                        </button>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default ConfirmBooking;