// src/components/Channelbar.js
import React from 'react';
import './Channelbar.css'; 

const Channelbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-bottom">
      <div className="container-fluid justify-content-between">
        {/* Logo à gauche */}
        <a className="navbar-brand" href="#">
          <img src="path/to/your/logo.png" height="40" alt="Logo" />
        </a>

        {/* Icônes centrées */}
        <ul className="navbar-nav flex-row justify-content-center">
          <li className="nav-item me-3 me-lg-1">
            <a className="nav-link" href="#">
              <span className="position-relative">
                <img src="path/to/your/icon1.png" className="rounded-circle" height="40" alt="Icon 1" />
                <span className="badge position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                  2
                </span>
              </span>
            </a>
          </li>
          <li className="nav-item me-3 me-lg-1">
            <a className="nav-link" href="#">
              <span className="position-relative">
                <img src="path/to/your/icon2.png" className="rounded-circle" height="40" alt="Icon 2" />
                <span className="badge position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                  147
                </span>
              </span>
            </a>
          </li>
          {/* Ajoutez d'autres icônes ici */}
        </ul>

        {/* Bouton + à droite */}
        <a className="navbar-brand" href="#">
          <i className="fas fa-plus-circle fa-lg text-white"></i>
        </a>
      </div>
    </nav>
  );
};

export default Channelbar;
