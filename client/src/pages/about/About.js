import "./about.css";
import profile_pic from "../../assets/bcg.png";
const About = () => {
  return (
    <div className='about-company'>
      <div className='about-img'>
        <img src={profile_pic} alt='' style={{ width: "80%" }} />
      </div>
      <div className='company-info'>
        <span>
          DOCTOR <span className='our'>AT FINGERS</span>
        </span>
        <p>
          <b>Laafiyah</b> is a DigiMedicine webapp that provides care both
          on-demand and by appointment for a variety of physical and mental
          health issues.With this service, users get to have a brief video/chat
          consultation with a licensed physician, who can offer guidance and
          treatment for several common conditions, including cold and flu,
          allergies, rashes, headaches, and more. Patients with chronic
          conditions like asthma, diabetes, and high blood pressure can also use
          Laafiyah to help them manage these issues. Laafiyah also offers
          behavioural and mental health care through available therapists and
          psychiatrists. Laafiyah is a free web application and there are no
          subscription fees. Users pay a flat rate for different services.
          Laafiyah also accepts many major health insurances. Additionally, they
          partner with a variety of national companies, like Ghana National
          Health Insurance Scheme.
        </p>
      </div>
    </div>
  );
};
export default About;
