import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { getAllChannels, deleteChannel} from '../../services/channelService';
import { getAllChannelTypes } from '../../services/channelTypeService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPageChannelList = () => {
  const [channels, setChannels] = useState([]);
  const [channelTypes, setChannelTypes] = useState([]);

  useEffect(() => {
    const fetchChannelsAndTypes = async () => {
      try {
        const [channelsData, channelTypesData] = await Promise.all([getAllChannels(), getAllChannelTypes()]);
        setChannels(channelsData);
        setChannelTypes(channelTypesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchChannelsAndTypes();
  }, []);

  const handleDeleteChannel = async (channelId) => {
    try {
      await deleteChannel(channelId);
      setChannels(channels.filter(channel => channel.channel_Id !== channelId));
      toast.success('Channel deleted successfully!');
    } catch (error) {
      console.error('Error deleting channel:', error);
      toast.error('Error deleting channel');
    }
  };

  const getChannelTypeName = (channelTypeId) => {
    const channelType = channelTypes.find(type => type.channelType_Id === channelTypeId);
    return channelType ? channelType.channelType_Name : 'Unknown Type';
  };

  return (
    <div className="p-3 admin-list">
      <h2>Liste des Channels</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {channels.map((channel) => (
            <tr key={channel.channel_Id}>
              <td>{channel.channel_Name}</td>
              <td>{getChannelTypeName(channel.channelType_Id)}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteChannel(channel.channel_Id)}
                >
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminPageChannelList;
