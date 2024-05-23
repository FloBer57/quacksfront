import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import UserPageSidebar from "../components/UserPage/UserPageSideBar";
import UserPagePersonalisation from "../components/UserPage/UserPagePersonalisation";
import UserPageSecurity from "../components/UserPage/UserPageSecurity";
import UserPageInfo from "../components/UserPage/UserPageInfo";
import { getUserIdFromToken } from "../services/authService";
import { getPersonById } from "../services/personService";

const UserPage = () => {
  const [person, setPerson] = useState(null);
  const [activeSection, setActiveSection] = useState('user-management');
  const navigate = useNavigate();

  const fetchPersonData = useCallback(async () => {
    const id = getUserIdFromToken();
    if (id) {
      try {
        const personData = await getPersonById(id, navigate);
        setPerson(personData);
      } catch (error) {
        console.error("Error fetching person data:", error);
      }
    }
  }, [navigate]);

  useEffect(() => {
    fetchPersonData();
  }, [fetchPersonData]);

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
