import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AdminPageSidebar = ({ setActiveSection }) => {
  const navigate = useNavigate(); 

  return (
    <div className="d-flex flex-column bg-light" style={{ height: '93vh', width: '250px' }}>
      <Nav className="flex-column flex-grow-1">
        <Nav.Link onClick={() => setActiveSection('user-management')}>Gestions des Utilisateurs</Nav.Link>
        <Nav.Link onClick={() => setActiveSection('create-user')}>Créer un Utilisateur</Nav.Link>
        <Nav.Link onClick={() => setActiveSection('channels')}>Gestions des Channels</Nav.Link>
      </Nav>
      <div className="mt-auto p-3">
        <Button variant="primary" onClick={() => navigate('/home')}>Retour à l'accueil</Button>
      </div>
    </div>
  );
};

export default AdminPageSidebar;
