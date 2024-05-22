import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import UserPageSidebar from "../components/Chat/UserPageSideBar";
import UserPagePersonalisation from "../components/Chat/UserPagePersonalisation";
import UserPageSecurity from "../components/Chat/UserPageSecurity";
import UserPageInfo from "../components/Chat/UserPageInfo";
import { getUserIdFromToken } from "../services/authService";
import { getPersonById } from "../services/personService";

const UserPage = () => {
  const [person, setPerson] = useState(null);
  const [activeSection, setActiveSection] = useState('user-management');
  const navigate = useNavigate();

  const fetchPersonData = async () => {
    const id = getUserIdFromToken();
    if (id) {
      try {
        const personData = await getPersonById(id, navigate);
        setPerson(personData);
      } catch (error) {
        console.error("Error fetching person data:", error);
      }
    }
  };

  useEffect(() => {
    fetchPersonData();
  }, [navigate]);

  if (!person) {
    return <div>Loading...</div>;
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'user-personalisation':
        return <UserPagePersonalisation person={person} fetchPersonData={fetchPersonData} />;
      case 'user-security':
        return <UserPageSecurity person={person} fetchPersonData={fetchPersonData} />;
      case 'user-info':
        return <UserPageInfo person={person} />;
      default:
        return null;
    }
  };

  return (
    <div className="d-flex flex-column">
      <Navbar person={person} />
      <div className="d-flex">
        <UserPageSidebar setActiveSection={setActiveSection} />
        <div className="d-flex flex-column" style={{ flex: 1 }}>
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
