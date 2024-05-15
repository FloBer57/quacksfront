// src/pages/HomePage.js
import React from 'react';
import Navbar from '../components/Navbar';
import Chat from '../components/Chat';
import ChannelbarWithProvider from '../components/Channelbar';

const HomePage = () => {
  const personId = 45;
  return (
    <div className="d-flex flex-column">
      <Navbar />
      <Chat />
      <ChannelbarWithProvider personId={personId} />
    </div>
  );
};

export default HomePage;
