import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from "react-toastify";
import { getAllPersons } from '../services/personService';
import { createChannel } from '../services/channelService';
import { createAssociation } from '../services/personxchannelservice';
import { createRoleAssociation } from '../services/channelpersonrolexpersonxchannelservice';
import './CreateChannelModal.css'; // Importez votre fichier CSS

const CreateChannelModal = ({ show, handleClose, onChannelCreated, creatorId }) => {
  const [channelName, setChannelName] = useState('');
  const [channelDescription, setChannelDescription] = useState('');
  const [selectedPersons, setSelectedPersons] = useState([creatorId]); // Ajouter le créateur par défaut
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
        channel_Description: channelDescription,
        channelType_Id: selectedPersons.length > 2 ? 2 : 1
      };
      const createdChannel = await createChannel(newChannel);

      // Créez les associations entre le canal et les personnes sélectionnées
      await Promise.all(selectedPersons.map(personId => {
        const role = personId === creatorId ? 1 : 2; // Le créateur est administrateur, les autres sont utilisateurs
        return createAssociation({ PersonId: personId, ChannelId: createdChannel.channel_Id, ChannelPersonRole_Id: role });
      }));

      // Créez les rôles de canal par défaut pour les personnes sélectionnées
      await Promise.all(selectedPersons.map(personId => {
        const role = personId === creatorId ? 1 : 2; // Le créateur est administrateur, les autres sont utilisateurs
        return createRoleAssociation({ PersonId: personId, ChannelId: createdChannel.channel_Id, ChannelPersonRole_Id: role });
      }));

      onChannelCreated(createdChannel);
      toast.success(`Création du channel ${channelName} réussie !`);
      // Réinitialiser les états après la création du canal
      setChannelName('');
      setChannelDescription('');
      setSelectedPersons([creatorId]);
      handleClose();
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

          <Form.Group controlId="formChannelDescription" className="mt-3">
            <Form.Label>Description du canal</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrer la description du canal"
              value={channelDescription}
              onChange={(e) => setChannelDescription(e.target.value)}
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
