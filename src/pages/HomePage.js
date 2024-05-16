// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Chat from '../components/Chat';
import ChannelbarWithProvider from '../components/ChannelBar';
import { getUserIdFromToken } from '../services/authService';

const HomePage = () => {
  const [personId, setPersonId] = useState(null);

  useEffect(() => {
    const id = getUserIdFromToken();
    setPersonId(id);
  }, []);

  if (personId === null) {
    return <div>Loading...</div>; // or any other loading indicator
  }

  return (
    <div className="d-flex flex-column">
      <Navbar />
      <Chat />
      <ChannelbarWithProvider personId={personId} />
    </div>
  );
};

export default HomePage;
