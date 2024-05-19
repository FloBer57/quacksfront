import React, { useContext, useState } from 'react';
import './Channelbar.css';
import { personXchannelContext, PersonXchannelProvider } from '../context/personxchannelontext';
import { useNavigate } from 'react-router-dom';
import CreateChannelModal from './CreateChannelModal';
import { toast, ToastContainer } from 'react-toastify';

const url = 'https://localhost:7019';

const Channelbar = ({ onChannelClick, onLogoClick, personId, channels, handleCreateChannel, handleChannelLeft }) => {
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const navigate = useNavigate();

  if (!channels) return <p>Loading...</p>;

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-bottom">
        <div className="container-fluid justify-content-between channelbar">
          {/* Logo à gauche */}
          <a className="navbar-brand" href="#" onClick={onLogoClick}>
            <img className="QuackersLogo" src={`${url}/Image/WebsiteNeeds/QuacksLogo.png`} height="40" alt="Logo" />
          </a>

          {/* Icônes centrées */}
          <ul className="navbar-nav flex-row justify-content-center discordimage">
            {channels.map((channel) => (
              <li key={channel.channel_Id} className="nav-item me-3 me-lg-1">
                <a className="nav-link" href="#" onClick={() => onChannelClick(channel.channel_Id)}>
                  <span className="position-relative">
                    <img src={`${url}${channel.channel_ImagePath}`} className="rounded-circle iconcircle" height="40" alt={channel.channel_Name} />
                    <span className="badge position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                      147
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Bouton + à droite */}
          <a className="navbar-brand" href="#" onClick={() => setShowCreateChannelModal(true)}>
            <i className="fas fa-plus-circle fa-lg text-white"></i>
          </a>
        </div>
      </nav>

      <CreateChannelModal
        show={showCreateChannelModal}
        handleClose={() => setShowCreateChannelModal(false)}
        onChannelCreated={handleCreateChannel}
        creatorId={personId} // Passez l'ID du créateur
      />
      <ToastContainer />
    </>
  );
};

const ChannelbarWithProvider = ({ personId, onChannelClick, onLogoClick, channels, handleCreateChannel, handleChannelLeft }) => (
  <PersonXchannelProvider personId={personId}>
    <Channelbar 
      onChannelClick={onChannelClick} 
      onLogoClick={onLogoClick} 
      personId={personId} 
      channels={channels} 
      handleCreateChannel={handleCreateChannel} 
      handleChannelLeft={handleChannelLeft} 
    />
  </PersonXchannelProvider>
);

export default ChannelbarWithProvider;
