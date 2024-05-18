import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Chat.css';
import { getMessagesByChannelId, getChannelById } from '../../services/channelService';
import { sendMessage } from '../../services/messageService';
import { createAttachments } from '../../services/attachmentService';
import { getPersonsByChannelId } from '../../services/personxchannelservice';
import { getPersonsByRoleInChannel } from '../../services/channelpersonrolexpersonxchannelservice';
import signalRService from '../../signalr-connection';

const Chat = ({ channelId, personId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [files, setFiles] = useState([]);
  const [otherPerson, setOtherPerson] = useState(null);
  const [channel, setChannel] = useState(null);
  const [adminMembers, setAdminMembers] = useState([]);
  const [userMembers, setUserMembers] = useState([]);
  const isSubscribed = useRef(false); // Utilisez useRef pour vérifier l'abonnement

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await getMessagesByChannelId(channelId);
        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    const fetchChannel = async () => {
      try {
        const channelData = await getChannelById(channelId);
        setChannel(channelData);

        if (channelData.channelType_Id === 1) {
          const persons = await getPersonsByChannelId(channelId);
          const other = persons.find((p) => p.person_Id !== personId);
          setOtherPerson(other);
        } else if (channelData.channelType_Id === 2) {
          fetchMembersByRole(channelId);
        }
      } catch (error) {
        console.error('Error fetching channel or persons:', error);
      }
    };

    const fetchMembersByRole = async (channelId) => {
      try {
        const fetchedAdminMembers = await getPersonsByRoleInChannel(channelId, 1);
        const fetchedUserMembers = await getPersonsByRoleInChannel(channelId, 2);
        setAdminMembers(fetchedAdminMembers);
        setUserMembers(fetchedUserMembers);
      } catch (error) {
        console.error('Error fetching members by role:', error);
      }
    };

    fetchMessages();
    fetchChannel();
  }, [channelId, personId]);

  useEffect(() => {
    if (!isSubscribed.current) {
      // SignalR: Subscribe to messages
      signalRService.onMessageReceived((userId, message) => {
        setMessages((prevMessages) => [...prevMessages, { person_Id: userId, message_Text: message, message_Date: new Date().toISOString() }]);
      });
      isSubscribed.current = true; // Marquez l'abonnement comme fait
    }
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '' && files.length === 0) return;

    const messageDto = {
      MessageText: newMessage,
      ChannelId: channelId,
      PersonId: personId,
    };

    try {
      const sentMessage = await sendMessage(messageDto);

      if (files.length > 0) {
        const attachmentDto = {
          Message_Id: sentMessage.message_Id,
        };

        const attachments = await createAttachments(attachmentDto, files);
        sentMessage.attachments = attachments;
        setFiles([]);
      }

      // Utilisation de SignalR pour envoyer le message
      signalRService.sendMessage(personId, newMessage);

      // Ne pas ajouter le message manuellement ici car il sera ajouté via SignalR
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleFileChange = (event) => {
    setFiles([...event.target.files]);
  };

  const renderMembers = (members, roleName) => {
    return (
      <div key={roleName}>
        <h5>{roleName}</h5>
        {members.map((member) => (
          <div key={member.person_Id} className="member-item">
            <img src={`https://localhost:7019/${member.person_ProfilPicturePath}`} alt="avatar" width="30" height="30" />
            <span>{member.person_FirstName} {member.person_LastName}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className={
        channel?.channelType_Id === 2
          ? 'container-fluid chat-container chat-containerchanneltype2'
          : 'container-fluid chat-container'
      }
    >
      <div className="row clearfix">
        <div className={
          channel?.channelType_Id === 2
            ? 'col-10'
            : 'col-12'
        }>
          <div className="card chat-app">
            <div className="chat">
              <div
                className={
                  channel?.channelType_Id === 2
                    ? 'chat-headerchanneltype2 chat-header'
                    : 'chat-header clearfix'
                }
              >
                <div className="row">
                  <div className="col-6 receiver-profil">
                    {otherPerson && (
                      <>
                        <a
                          href="javascript:void(0);"
                          data-toggle="modal"
                          data-target="#view_info"
                        >
                          <img
                            src={`https://localhost:7019/${otherPerson.person_ProfilPicturePath}`}
                            alt="avatar"
                          />
                        </a>
                        <div className="chat-about">
                          <h6 className="m-b-0">
                            {otherPerson.person_FirstName}{' '}
                            {otherPerson.person_LastName}
                          </h6>
                          <small>{otherPerson.person_Description}</small>{' '}
                          {/* Here you can add actual last seen data if available */}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div
                className={
                  channel?.channelType_Id === 2
                    ? 'chat-historychanneltype2 chat-history'
                    : 'chat-history'
                }
              >
                <ul className="m-b-0">
                  {messages.map((message, index) => (
                    <li key={index} className="clearfix">
                      <div className="message-data">
                        <span className="message-data-time">
                          {new Date(message.message_Date).toLocaleString()}
                        </span>
                      </div>
                      <div
                        className={`message ${
                          message.person_Id === personId
                            ? 'my-message'
                            : 'other-message float-right'
                        }`}
                      >
                        {message.message_Text || message.message}
                        {message.attachments &&
                          message.attachments.map((attachment, index) => (
                            <div key={index} className="attachment">
                              <a
                                href={`https://localhost:7019/${attachment.AttachmentThing}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {attachment.Attachment_Name}
                              </a>
                            </div>
                          ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="chat-message clearfix">
                <div className="input-group mb-0">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter text here..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-primary"
                      onClick={handleSendMessage}
                    >
                      <i className="fa fa-paper-plane" aria-hidden="true"></i>
                    </button>
                    <input
                      type="file"
                      className="btn btn-secondary"
                      onChange={handleFileChange}
                      multiple
                      style={{ display: 'none' }}
                      id="fileInput"
                    />
                    <label htmlFor="fileInput" className="btn btn-secondary">
                      <i className="fa fa-paperclip" aria-hidden="true"></i>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {channel?.channelType_Id === 2 && (
          <div className="col-2 members-list">
            {renderMembers(adminMembers, 'Administrateur')}
            {renderMembers(userMembers, 'Utilisateur')}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
