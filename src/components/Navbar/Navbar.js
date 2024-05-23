import React, { useState, useEffect, useMemo } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import { revokeRefreshToken } from '../../services/authService';
import { useAuth } from '../../context/authContext';
import { updatePerson } from '../../services/personService';
import { toast } from "react-toastify";
import "./Navbar.css";

const CustomDropdownToggle = React.forwardRef(({ children, onClick, className }, ref) => (
  <a
    href="!#"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className={`dropdown-toggle-custom ${className}`}
  >
    {children}
  </a>
));

const Navbar = ({ person }) => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const statusList = useMemo(() => [
    { PersonStatut_Id: 1, PersonStatut_Name: 'Hors ligne' },
    { PersonStatut_Id: 2, PersonStatut_Name: 'Actif' },
    { PersonStatut_Id: 3, PersonStatut_Name: 'Inactif' },
    { PersonStatut_Id: 4, PersonStatut_Name: 'Occupé' },
    { PersonStatut_Id: 5, PersonStatut_Name: 'En ligne' }
  ], []);

  useEffect(() => {
    const status = statusList.find(status => status.PersonStatut_Id === person.personStatut_Id);
    setCurrentStatus(status);
    console.log("Initial status set to:", status);
  }, [person.personStatut_Id, statusList]);

  const handleClose = () => setShowOffcanvas(false);
  const toggleShow = () => setShowOffcanvas((s) => !s);

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
      await updatePerson(person.person_Id, { StatutId: 1 }); // Mettre à jour le statut à "Hors ligne"
      await revokeRefreshToken(refreshToken);
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      logout();
      navigate('/login');
      toast.success("Vous vous êtes déconnecté");
    } catch (error) {
      console.error('Failed to revoke token:', error);
    }
  };

  const handleStatusChange = async (status) => {
    try {
      console.log("Updating status to:", status.PersonStatut_Name);
      await updatePerson(person.person_Id, { StatutId: status.PersonStatut_Id });
      setCurrentStatus(status);
      console.log("Status successfully updated to:", status.PersonStatut_Name);
      toast.success("Changement de status effectué", status.PersonStatut_Name);
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const getStatusClass = () => {
    switch (currentStatus?.PersonStatut_Name) {
      case 'En ligne':
        return 'status-online';
      case 'Occupé':
        return 'status-busy';
      case 'Inactif':
        return 'status-inactive';
      case 'Actif':
        return 'status-active';
      default:
        return 'status-offline';
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary top-navbar">
        <div className="container-fluid justify-content-between">
          <div className="d-flex">
            <a
              className="nav-link dropdown-toggle hidden-arrow"
              href="!#"
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
          <ul className="flex-row profilbar">
            <li className="nav-item dropdown me-3 me-lg-1">
              <Dropdown>
                <Dropdown.Toggle
                  as={CustomDropdownToggle}
                  id="dropdown-custom-components"
                  className={getStatusClass()}
                >
                  <i className="fas fa-chevron-circle-down fa-lg"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu">
                  {statusList.map(status => (
                    <Dropdown.Item
                      key={status.PersonStatut_Id}
                      onClick={() => handleStatusChange(status)}
                    >
                      {status.PersonStatut_Name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li className="nav-item me-3 me-lg-1">
              <a
                className="nav-link d-sm-flex align-items-sm-center profilname"
                href="!#"
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
                  <Dropdown.Item href="/UserPage">Mon compte</Dropdown.Item>
                  {person.personRole_Id === 2 ? (
                    <Dropdown.Item href="/AdminPage">Administrateur</Dropdown.Item>
                  ) : null}
                  <Dropdown.Item onClick={handleLogout}>Déconnexion</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </nav>

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
