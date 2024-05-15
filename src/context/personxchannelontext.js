// src/context/personXchannelContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getChannelsByPersonId } from '../services/personxchannelservice';

export const personXchannelContext = createContext();

export const PersonXchannelProvider = ({ children, personId }) => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const data = await getChannelsByPersonId(personId);
        setChannels(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChannels();
  }, [personId]);

  return (
    <personXchannelContext.Provider value={{ channels, loading, error }}>
      {children}
    </personXchannelContext.Provider>
  );
};
