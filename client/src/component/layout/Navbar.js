import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => (
  <Fragment>
    <nav className="navbar bg-dark">
      <h1>
        <Link to='/'href="index.html"><i className="fas fa-code"></i> DevWorkshop</Link>
      </h1>
      <ul>
        <li><a href="!#">Developers</a></li>
      
        <li><Link to="/register">Register</Link></li>
  
        <li> <Link to="/login">Login</Link></li>
      </ul>
    </nav>
    </Fragment>
);
export default Navbar;
