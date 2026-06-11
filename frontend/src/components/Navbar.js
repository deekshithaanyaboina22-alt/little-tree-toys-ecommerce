 import { useState } from 'react';
 import { Link } from 'react-router-dom';
 import '../styles/Navbar.css';

 function Navbar({


  wishlistCount,

  cartCount

}) {

  const [menuOpen, setMenuOpen] = useState(false);

  return (

    <nav className="navbar">

      <div className="logo-section">
         <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
           >
             {menuOpen ? '✕' : '☰'}
        </button>

        <div className="logo">

           <Link to="/">
              Little Tree Toys
           </Link>

        </div>

        <p className="tagline">
          Thoughtfully Crafted Wooden Play.
        </p>

      </div>

        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/shop">Shop</Link>
        </li>

        <li>
            <Link to="/about">About</Link>
        </li>

        <li>
            <Link to="/wishlist">
             Wishlist ({wishlistCount})
            </Link>
        </li>


        <li>

            <Link to="/cart">
             Cart ({cartCount})
             </Link>

        </li>

        <li>

            <Link to="/account">
            Account
            </Link>

        </li>

      </ul>

    </nav>
  );
}

export default Navbar;