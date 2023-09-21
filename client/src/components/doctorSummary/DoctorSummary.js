import './DoctorSummary.css';

const DoctorSummary = ({ doctor }) => {

    const specialitiesString = () => {
        const joinString = doctor.specialities.join(' - ');
        if (joinString.length >= 30) {
            return `${joinString.substring(0, 30)}...`
        }
        return joinString;
    } 

    return (
        <div className='introInfo'>
            <img width='200px' height='200px' src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?w=740&t=st=1695039615~exp=1695040215~hmac=1e4d4c101f0815e8d28a081a7fe5e8c218d96425488e928037b6324057937f01" />
            <div className='summary'>
                <h4>{ `${doctor.firstName} ${doctor.lastName}`}</h4>
                <p>{specialitiesString()}</p>
                <p>M.B.B.S, F.C.P.S</p>
                <p>{doctor.hospitalAffiliation}</p>
            </div>
        </div>
    );
}

export default DoctorSummary;