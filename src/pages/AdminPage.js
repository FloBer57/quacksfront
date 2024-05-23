import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import AdminPageSidebar from "../components/AdminPage/AdminPageSideBar";
import AdminPageUserList from "../components/AdminPage/AdminPageUserList";
import AdminPageChannelList from "../components/AdminPage/AdminPageChannelList";
import AdminPageCreateAccount from "../components/AdminPage/AdminPageCreateAccount";
import { getUserIdFromToken } from "../services/authService";
import { getPersonById } from "../services/personService";

const AdminPage = () => {
  const [person, setPerson] = useState(null);
  const [activeSection, setActiveSection] = useState('user-management');
  const navigate = useNavigate();

  useEffect(() => {
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

    fetchPersonData();
  }, [navigate]);

  if (!person) {
    return <div>Loading...</div>; // or any other loading indicator
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'user-management':
        return <AdminPageUserList />;
      case 'create-user':
        return <AdminPageCreateAccount />;
      case 'channels':
        return <AdminPageChannelList />;
      default:
        return null;
    }
  };

  return (
    <div className="d-flex flex-column">
      <Navbar person={person} />
      <div className="d-flex">
        <AdminPageSidebar setActiveSection={setActiveSection} />
        <div className="d-flex flex-column" style={{ flex: 1 }}>
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
