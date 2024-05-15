// src/context/personXchannelContext.js
import React, { createContext, useContext, useState } from 'react';
import { getChannelsByPersonId } from '../services/personXChannelService';
import { getChannelById } from '../services/channelService';

const PersonXChannelContext = createContext({
  channels: [],
  loading: true,
  fetchChannelsByPersonId: () => {},
});

export const PersonXChannelProvider = ({ children }) => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchChannelsByPersonId = async (personId) => {
    try {
      setLoading(true);
      console.log(`Fetching channels for person ID: ${personId}`);
      const data = await getChannelsByPersonId(personId);
      console.log(`Channels associations fetched: `, data);

      const channelsDetails = await Promise.all(
        data.map(async (channelAssociation) => {
          const channelDetails = await getChannelById(channelAssociation.channel_Id);
          console.log(`Channel details for ID ${channelAssociation.channel_Id}: `, channelDetails);
          return channelDetails;
        })
      );

      console.log('Final channels details: ', channelsDetails);
      setChannels(channelsDetails);
    } catch (error) {
      console.error('Error fetching channels:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PersonXChannelContext.Provider value={{ channels, loading, fetchChannelsByPersonId }}>
      {children}
    </PersonXChannelContext.Provider>
  );
};

export const usePersonXChannel = () => useContext(PersonXChannelContext);
