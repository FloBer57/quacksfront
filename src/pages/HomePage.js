// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Chat from '../components/Chat/Chat';
import Accueil from '../components/Acceuil';
import ChannelbarWithProvider from '../components/Channelbar';
import { getUserIdFromToken, getUserRoleFromToken } from '../services/authService';
import { getPersonById } from '../services/personService';

const HomePage = () => {
  const [person, setPerson] = useState(null);
  const [selectedChannelId, setSelectedChannelId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPersonData = async () => {
      const id = getUserIdFromToken();
      if (id) {
        try {
          const personData = await getPersonById(id, navigate); // Pass navigate to the service
          setPerson(personData);
        } catch (error) {
          console.error("Error fetching person data:", error);
        }
      }
    };

    fetchPersonData();
  }, [navigate]);

  const handleChannelClick = (channelId) => {
    setSelectedChannelId(channelId);
  };

  const handleLogoClick = () => {
    setSelectedChannelId(null);
  };

  if (person === null) {
    return <div>Loading...</div>; // or any other loading indicator
  }

  return (
    <div className="d-flex flex-column">
      <Navbar person={person} />
      {selectedChannelId ? <Chat channelId={selectedChannelId} personId={person.person_Id} /> : <Accueil person={person} />}
      <ChannelbarWithProvider personId={person.person_Id} onChannelClick={handleChannelClick} onLogoClick={handleLogoClick} />
    </div>
  );
};

export default HomePage;
