import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import { revokeRefreshToken } from '../services/authService';
import { useAuth } from '../context/authContext';
import "./Navbar.css";

const CustomDropdownToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href="#"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className="dropdown-toggle-custom"
  >
    {children}
  </a>
));

const Navbar = ({ person }) => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleClose = () => setShowOffcanvas(false);
  const toggleShow = () => setShowOffcanvas((s) => !s);

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refreshToken'); // Utilisez le refresh token
    try {
      await revokeRefreshToken(refreshToken); // Passez le refresh token
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to revoke token:', error);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
        <div className="container-fluid justify-content-between">
          {/* Left elements */}
          <div className="d-flex">
            {/* Brand */}
            <a
              className="nav-link dropdown-toggle hidden-arrow"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              aria-expanded="false"
              onClick={toggleShow}
            >
              <i className="fas fa-bell fa-lg"></i>
              <span className="badge rounded-pill badge-notification bg-danger">
                12
              </span>
            </a>
          </div>
          {/* Left elements */}

          {/* Right elements */}
          <ul className="flex-row profilbar">
            <li className="nav-item dropdown me-3 me-lg-1">
              <Dropdown>
                <Dropdown.Toggle
                  as={CustomDropdownToggle}
                  id="dropdown-custom-components"
                >
                  <i className="fas fa-chevron-circle-down fa-lg"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu">
                  <Dropdown.Item href="#/action-1">Hors ligne</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Connecté</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Absent</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li className="nav-item dropdown me-3 me-lg-1">
              <span className="badge rounded-pill badge-notification bg-danger profil-statut">
                {" "}
                oo
              </span>
            </li>
            <li className="nav-item me-3 me-lg-1">
              <a
                className="nav-link d-sm-flex align-items-sm-center profilname"
                href="#"
              >
                <img
                  src={`https://localhost:7019/${person.person_ProfilPicturePath}`}
                  className="rounded-circle"
                  height="22"
                  alt="Profile"
                  loading="lazy"
                />
                <strong className="d-none d-sm-block ms-1">
                  {person.person_FirstName}
                </strong>
              </a>
            </li>
            <li className="nav-item dropdown me-3 me-lg-1">
              <Dropdown>
                <Dropdown.Toggle
                  as={CustomDropdownToggle}
                  id="dropdown-custom-components"
                >
                  <i className="fas fa-cog fa-lg"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu">
                  <Dropdown.Item href="#/action-1">Mon compte</Dropdown.Item>
                  {person.personRole_Id === 2 ? (
                    <Dropdown.Item href="#/action-2">Administrateur</Dropdown.Item>
                  ) : null}
                  <Dropdown.Item onClick={handleLogout}>Déconnexion</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
          {/* Right elements */}
        </div>
      </nav>

      {/* Offcanvas */}
      <Offcanvas show={showOffcanvas} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Notifications</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Navbar;
