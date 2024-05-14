// src/pages/HomePage.js
import React from 'react';
import Navbar from '../components/Navbar';
import Chat from '../components/Chat';
import './HomePage.css';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Chat />
    </>
  );
};

export default HomePage;
