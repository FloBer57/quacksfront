// src/components/Channelbar.js
import React, { useContext } from 'react';
import './Channelbar.css';
import { personXchannelContext, PersonXchannelProvider } from '../context/personxchannelontext';

const Channelbar = () => {
  const { channels, loading, error } = useContext(personXchannelContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-bottom">
      <div className="container-fluid justify-content-between channelbar">
        {/* Logo à gauche */}
        <a className="navbar-brand" href="#">
          <img src="path/to/your/logo.png" height="40" alt="Logo" />
        </a>

        {/* Icônes centrées */}
        <ul className="navbar-nav flex-row justify-content-center discordimage">
          {channels.map((channel) => (
            <li key={channel.channel_Id} className="nav-item me-3 me-lg-1">
              <a className="nav-link" href="#">
                <span className="position-relative">
                  <img src={`https://localhost:7019${channel.channel_ImagePath}`}  className="rounded-circle iconcircle" height="40" alt={channel.channel_Name} />
                  {/* Remplacer le 147 par le nombre de messages non lus ou toute autre donnée appropriée */}
                  <span className="badge position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                    147
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* Bouton + à droite */}
        <a className="navbar-brand" href="#">
          <i className="fas fa-plus-circle fa-lg text-white"></i>
        </a>
      </div>
    </nav>
  );
};

const ChannelbarWithProvider = ({ personId }) => (
  <PersonXchannelProvider personId={personId}>
    <Channelbar />
  </PersonXchannelProvider>
);

export default ChannelbarWithProvider;
