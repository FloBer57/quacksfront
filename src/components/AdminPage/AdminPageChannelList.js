import React from 'react';
import { Table, Button } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { useChannelList } from '../../hooks/adminHooks';

const AdminPageChannelList = () => {
  const { channels, handleDeleteChannel, getChannelTypeName } = useChannelList();

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
