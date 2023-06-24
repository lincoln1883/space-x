import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/planet.png';

const Navbar = () => (
  <>
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <NavLink className="navbar-brand ms-4 d-flex align-items-center" to="/">
          <img src={logo} alt="planet" width="70" height="70" />
          <h1 className="ms-2 fs-3 d-none d-sm-block">
            Space Travelers&apos; Hub
          </h1>
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll">
            <li className="nav-item">
              <NavLink className="nav-link text-primary" aria-current="page" to="/">Rockets</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link  text-primary" to="/missions">Missions</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link  text-primary" to="/profile">Profile</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <hr className="w-auto ms-5 me-5" />
  </>
);

export default Navbar;
