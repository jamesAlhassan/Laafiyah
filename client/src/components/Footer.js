import { FaSquareFacebook } from "react-icons/fa6";
import {
  AiFillInstagram,
  AiFillGithub,
  AiFillTwitterCircle,
  AiFillLinkedin,
} from "react-icons/ai";
import { Link } from "react-router-dom";
const year = new Date().getFullYear();
const Footer = () => {
  return (
    <footer className='footer' id='socials'>
      <div className='section-center'>
        <p style={{ color: "white" }}>Like, Follow and Subscribe:</p>

        <div className='social-icons'>
          <a href='https://github.com/' target='_blank' className='social-icon'>
            <AiFillGithub />
          </a>
          <a
            href='https://instaram.com/'
            target='_blank'
            className='social-icon'
          >
            <AiFillInstagram />
          </a>
          <a
            href='https://twitter.com/'
            target='_blank'
            className='social-icon'
          >
            <AiFillTwitterCircle />
          </a>
          <a
            href='https://www.linkedin.com/'
            className='social-icon'
            target='_blank'
          >
            <AiFillLinkedin />
          </a>
        </div>
        <h4 className='footer-text'>
          &copy;
          <span>{year}</span>
          <span className='company'>laafiyah</span>
          all rights reserved
        </h4>
      </div>
    </footer>
  );
};
export default Footer;
