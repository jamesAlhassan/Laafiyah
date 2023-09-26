import DoctorSummary from "../../components/doctorSummary/DoctorSummary";
import Review from "../../components/review/Review";
import './Booking.css';

const Booking = () => {

    const availability = [
        {
            "day": "Monday",
            "timeslots": [
                "04:42",
                "04:44",
                "06:42",
                "04:42",
                "04:44",
                "06:42",
                "04:42",
                "04:44",
                "06:42",
                "04:42",
                "04:44",
                "06:42",
                "04:42",
                "04:44",
                "06:42",
            ],
            "_id": {
                "$oid": "65110fc149d46e1d383e6a8a"
            }
        },
        {
            "day": "Thursday",
            "timeslots": [
                "04:46",
                "04:47"
            ],
            "_id": {
                "$oid": "65110fc149d46e1d383e6a8b"
            }
        },
        {
            "day": "Sunday",
            "timeslots": [
                "04:47"
            ],
            "_id": {
                "$oid": "65110fc149d46e1d383e6a8c"
            }
        },
        {
            "day": "Wednesday",
            "timeslots": [
                "04:47"
            ],
            "_id": {
                "$oid": "65110fc149d46e1d383e6a8d"
            }
        }
    ];
    console.log(availability.length, availability)

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

    return (
        <div className="booking">
            <div className="booking-container">
                <DoctorSummary className='docSummary' key={doctorData.id} doctor={doctorData} />
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
                                        <td>{item.day}</td>
                                        <td>
                                            <ul>
                                                {item.timeslots.map((slot, index) => (
                                                    <li key={index}><button>{slot}</button></li>
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