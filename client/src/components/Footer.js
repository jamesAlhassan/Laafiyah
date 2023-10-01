import { FaSquareFacebook } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { Link } from "react-router-dom";
const year = new Date().getFullYear();
const Footer = () => {
  return (
    <footer>
      <div className='content'>
        <div className='top'>
          <div className='logo-details'>
            <span className='logo_name'>LAAFIYAH</span>
          </div>
          <div className='media-icons'>
            <a target='on_blank' href='#'>
              <FaSquareFacebook />
            </a>
            <a target='on_blank' href='https://www.instagram.com/'>
              <AiFillInstagram />>
            </a>
          </div>
        </div>
        <div className='link-boxes'>
          <ul className='box'>
            <li className='link_name'>Links</li>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/about'>About Us</Link>
            </li>
          </ul>

          <ul className='box'>
            <li className='link_name'>Contact</li>
            <li>
              <a target='on_blank' href='tel:+233246222173'>
                +233246222173
              </a>
              <a target='on_blank' href='tel:+233241788458'>
                +233241788458
              </a>
            </li>
            <li>
              <a target='on_blank' href="mailto:'jamesalhassan052@gmail.com'">
                jamesalhassan052@gmail.com
              </a>
              <a target='on_blank' href="mailto:'afatahu@gmail.com'">
                afatahu@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className='bottom-details'>
        <div className='bottom_text'>
          <span className='copyright_text'>
            Copyright © {year} <a href='#'>LAAFIYAH</a>
          </span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
