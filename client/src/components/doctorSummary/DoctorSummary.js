import './DoctorSummary.css';

const DoctorSummary = () => {
    return (
        <div className='introInfo'>
            <img width='200px' height='200px' src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?w=740&t=st=1695039615~exp=1695040215~hmac=1e4d4c101f0815e8d28a081a7fe5e8c218d96425488e928037b6324057937f01" />
            <div className='summary'>
                <h4>Dr. Name</h4>
                <p>Urologist, Andrologist</p>
                <p>M.B.B.S, F.C.P.S</p>
                <p>37 Military hospital</p>
                <p>23 years experience</p>
            </div>
        </div>
    );
}

export default DoctorSummary;