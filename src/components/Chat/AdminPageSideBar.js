import React from 'react';
import { Nav } from 'react-bootstrap';

const AdminPageSidebar = ({ setActiveSection }) => {
  return (
    <div className="d-flex flex-column bg-light" style={{ height: '93vh', width: '250px' }}>
      <Nav className="flex-column">
        <Nav.Link onClick={() => setActiveSection('user-management')}>Gestions des Utilisateurs</Nav.Link>
        <Nav.Link onClick={() => setActiveSection('create-user')}>Créer un Utilisateur</Nav.Link>
        <Nav.Link onClick={() => setActiveSection('channels')}>Gestions des Channels</Nav.Link>
      </Nav>
    </div>
  );
};

export default AdminPageSidebar;
