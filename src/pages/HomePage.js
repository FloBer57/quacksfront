// src/pages/HomePage.js
import React from 'react';
import Navbar from '../components/Navbar';
import Chat from '../components/Chat';
import Channelbar from '../components/Channelbar';

const HomePage = () => {
  return (
    <div className="d-flex flex-column">
      <Navbar />
      <Chat />
      <Channelbar />
    </div>
  );
};

export default HomePage;
