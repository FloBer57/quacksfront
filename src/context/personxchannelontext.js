import React, { createContext, useState, useEffect } from 'react';
import { getChannelsByPersonId } from '../services/personxchannelservice';

const personXchannelContext = createContext();

const PersonXchannelProvider = ({ personId, children }) => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const data = await getChannelsByPersonId(personId);
        setChannels(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchChannels();
  }, [personId]);

  return (
    <personXchannelContext.Provider value={{ channels, loading, error, setChannels }}>
      {children}
    </personXchannelContext.Provider>
  );
};

export { personXchannelContext, PersonXchannelProvider };
