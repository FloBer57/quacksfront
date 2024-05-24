import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from "react-toastify";
import { getAllPersons, getPersonById } from '../../../services/personService';
import { createChannel } from '../../../services/channelService';
import { createRoleAssociation } from '../../../services/channelpersonrolexpersonxchannelservice';
import { createAssociation } from '../../../services/personxchannelservice';
import { createNotification, addPersonXNotification } from '../../../services/notificationService';
import './CreateChannelModal.css';
import SignalRService from '../../../signalr-connection';

const CreateChannelModal = ({ show, handleClose, onChannelCreated, creatorId }) => {
  const [channelName, setChannelName] = useState('');
  const [selectedPersons, setSelectedPersons] = useState([creatorId]);
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const data = await getAllPersons();
        setPersons(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchPersons();
  }, []);

  const handleCreateChannel = async () => {
    try {
      const newChannel = {
        channel_Name: channelName,
        channelType_Id: selectedPersons.length > 2 ? 2 : 1
      };
      const createdChannel = await createChannel(newChannel);

      await Promise.all(selectedPersons.map(personId => {
        const role = personId === creatorId ? 1 : 2;
        return createRoleAssociation({ personId: personId, channelId: createdChannel.channel_Id, channelPersonRole_Id: role });
      }));

      await Promise.all(selectedPersons.map(async personId => {
        await createAssociation({ personId: personId, channelId: createdChannel.channel_Id });
      }));

      const nameCreator = await getPersonById(creatorId);

      const notification = {
        Notification_Name: `Invitation ${channelName}`,
        Notification_Text: `Vous avez été invité à rejoindre le canal ${channelName} par ${nameCreator.person_FirstName} ${nameCreator.person_LastName}`,
        Notification_TypeId: 1
      };

      const createdNotification = await createNotification(notification);

      await Promise.all(selectedPersons.map(personId => addPersonXNotification(personId, createdNotification.notification_Id)));

      onChannelCreated(createdChannel);
      toast.success(`Création du channel ${channelName} réussie !`);
      setChannelName('');
      setSelectedPersons([creatorId]);
      handleClose();

      SignalRService.sendNotification(createdNotification.notification_Id, notification.Notification_Name, notification.Notification_Text, notification.Notification_TypeId);
      console.log("Selected Persons IDs: ", selectedPersons);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAddPerson = (personId) => {
    if (!selectedPersons.includes(personId)) {
      setSelectedPersons([...selectedPersons, personId]);
    }
  };

  const handleRemovePerson = (personId) => {
    if (personId !== creatorId) {
      setSelectedPersons(selectedPersons.filter(id => id !== personId));
    }
  };

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="create-channel-modal">
      <Modal.Header closeButton>
        <Modal.Title>Créer un nouveau canal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formChannelName">
            <Form.Label>Nom du canal</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrer le nom du canal"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPersons" className="mt-3 persons-list">
            <Form.Label>Ajouter des personnes</Form.Label>
            <ul>
              {persons.map((person) => (
                <li key={person.person_Id}>
                  {person.person_FirstName} {person.person_LastName}
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleAddPerson(person.person_Id)}
                    className="ml-2"
                    disabled={selectedPersons.includes(person.person_Id)}
                  >
                    +
                  </Button>
                </li>
              ))}
            </ul>
          </Form.Group>

          <div className="mt-3">
            <Form.Label>Personnes ajoutées</Form.Label>
            <ul className="addedPersonList">
              {selectedPersons.map(personId => {
                const person = persons.find(p => p.person_Id === personId);
                return person ? (
                  <li key={personId}>
                    {person.person_FirstName} {person.person_LastName}
                    <Button variant="danger" size="sm" onClick={() => handleRemovePerson(personId)} className="ml-2" disabled={personId === creatorId}>Retirer</Button>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Annuler
        </Button>
        <Button variant="primary" onClick={handleCreateChannel}>
          Créer le canal
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateChannelModal;
