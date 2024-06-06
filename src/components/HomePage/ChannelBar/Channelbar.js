import React, { useState, useRef } from 'react';
import './Channelbar.css';
import { PersonXchannelProvider } from '../../../context/personxchannelontext';
import CreateChannelModal from './CreateChannelModal';

const url = process.env.REACT_APP_API_URL 

const Channelbar = ({ onChannelClick, onLogoClick, personId, channels, handleCreateChannel, handleChannelLeft }) => {
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const channelListRef = useRef(null);

  const scrollLeft = () => {
    if (channelListRef.current) {
      channelListRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (channelListRef.current) {
      channelListRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  if (!channels) return <p>Loading...</p>;

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-bottom channelbarbg">
        <div className="container-fluid justify-content-between channelbar">
          {/* Logo à gauche */}
          <a className="navbar-brand" href="#" onClick={onLogoClick}>
            <img className="QuackersLogo" src={`${url}/Image/WebsiteNeeds/QuacksLogo.png`} height="40" alt="Logo" />
          </a>

          {/* Bouton de défilement gauche */}
          <button className="scroll-button scroll-button-left" onClick={scrollLeft}>
            <i className="fas fa-chevron-left"></i>
          </button>

          {/* Icônes centrées */}
          <ul className="navbar-nav flex-row justify-content-center discordimage" ref={channelListRef}>
            {channels.length === 0 ? (
              <li className="nav-item me-3 me-lg-1">
                <p className="nav-link channel-zero">Encore 0 channels!</p>
              </li>
            ) : (
              channels.map((channel) => (
                <li key={channel.channel_Id} className="nav-item me-3 me-lg-1">
                  <a className="nav-link" href="#" onClick={() => onChannelClick(channel.channel_Id)}>
                    <span className="position-relative channel-picture">
                      <img src={`${url}${channel.channel_ImagePath}`} className="rounded-circle iconcircle" height="40" alt={channel.channel_Name} />
                      <span className="badge position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                        147
                      </span>
                    </span>
                  </a>
                </li>
              ))
            )}
          </ul>

          {/* Bouton de défilement droit */}
          <button className="scroll-button scroll-button-right" onClick={scrollRight}>
            <i className="fas fa-chevron-right"></i>
          </button>

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
