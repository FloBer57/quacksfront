import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Chat from '../components/HomePage/Chat/Chat';
import Accueil from '../components/HomePage/Acceuil/Acceuil';
import ChannelbarWithProvider from '../components/HomePage/ChannelBar/Channelbar';
import NotificationNav from '../components/Navbar/NotificationNav';
import { getUserIdFromToken } from '../services/authService';
import { getPersonById } from '../services/personService';
import { getChannelsByPersonId } from '../services/personxchannelservice'; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const [person, setPerson] = useState(null);
  const [selectedChannelId, setSelectedChannelId] = useState(null);
  const [channels, setChannels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPersonData = async () => {
      const id = getUserIdFromToken();
      if (id) {
        try {
          const personData = await getPersonById(id, navigate); 
          setPerson(personData);

          const personChannels = await getChannelsByPersonId(id);
          setChannels(personChannels);
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

  const handleChannelLeft = (channelId, channelName) => {
    toast.info(`Vous venez de quitter le channel ${channelName}`);
    setChannels((prevChannels) => prevChannels.filter(channel => channel.channel_Id !== channelId));
    setSelectedChannelId(null);
  };

  const handleCreateChannel = (newChannel) => {
    setChannels((prevChannels) => [...prevChannels, newChannel]);
  };

  if (person === null) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="d-flex flex-column">
      <Navbar person={person} />
      {selectedChannelId ? 
        <Chat channelId={selectedChannelId} personId={person.person_Id} onChannelLeft={handleChannelLeft} /> 
        : 
        <Accueil person={person} />
      }
      <ChannelbarWithProvider 
        personId={person.person_Id} 
        onChannelClick={handleChannelClick} 
        onLogoClick={handleLogoClick} 
        channels={channels}
        handleCreateChannel={handleCreateChannel}
        handleChannelLeft={handleChannelLeft}
      />
    </div>
  );
};

export default HomePage;
