import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import UserPageSidebar from "../components/UserPage/UserPageSideBar";
import UserPagePersonalisation from "../components/UserPage/UserPagePersonalisation";
import UserPageSecurity from "../components/UserPage/UserPageSecurity";
import UserPageInfo from "../components/UserPage/UserPageInfo";
import { useUserProfile } from "../hooks/userHooks";

const UserPage = () => {
  const navigate = useNavigate();
  const {
    person,
    activeSection,
    setActiveSection,
    fetchPersonData
  } = useUserProfile(navigate);

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
