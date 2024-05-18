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
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ChannelHeader from './ChannelHeader';

const Chat = ({ channelId, personId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [files, setFiles] = useState([]);
  const [otherPerson, setOtherPerson] = useState(null);
  const [channel, setChannel] = useState(null);
  const [adminMembers, setAdminMembers] = useState([]);
  const [userMembers, setUserMembers] = useState([]);
  const isSubscribed = useRef(false);

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
      signalRService.onMessageReceived((userId, message) => {
        setMessages((prevMessages) => [...prevMessages, { person_Id: userId, message_Text: message, message_Date: new Date().toISOString() }]);
      });
      isSubscribed.current = true;
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

      signalRService.sendMessage(personId, newMessage);
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
              <ChannelHeader otherPerson={otherPerson} />
              <MessageList messages={messages} personId={personId} />
              <MessageInput
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                handleSendMessage={handleSendMessage}
                handleFileChange={handleFileChange}
              />
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
