import '../styles/Footer.css';
import { Link } from "react-router-dom";

import {
  FaInstagram,
  FaPinterestP
} from 'react-icons/fa';

function Footer() {

  return (

    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">

          <h2>Little Tree Toys</h2>

          <p>
            Thoughtfully crafted wooden play for modern childhoods.
          </p>

        </div>

        <div className="footer-links">

          <h3>Our Collections</h3>

           <p className="footer-collections">
               First Discoveries • Creative Play
           </p>

             <p className="footer-collections">
               Learning Through Play • Thoughtful Gifts
            </p>

            <Link
  to="/admin-order"
  className="admin-link"
>
  Admin Dashboard
</Link>

        </div>

        <div className="footer-contact">

          <h3>Connect</h3>

          <a href="mailto:hello@littletreetoys.com">
              hello@littletreetoys.com
          </a>

          <div className="social-icons">

           <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            >
           <FaInstagram />
           </a>

            <a
             href="https://pinterest.com"
             target="_blank"
             rel="noreferrer"
            >
            <FaPinterestP />
            </a>

          </div>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © 2026 Little Tree Toys. All rights reserved.
        </p>

      </div>

    </footer>

  );

}

export default Footer;