// src/components/Chat.js
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Chat.css';
import { getMessagesByChannelId } from '../services/channelService';

const Chat = ({ channelId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await getMessagesByChannelId(channelId);
        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [channelId]);

  return (
    <div className="container-fluid chat-container">
      <div className="row clearfix">
        <div className="col-12">
          <div className="card chat-app">
            <div className="chat">
              <div className="chat-header clearfix">
                <div className="row">
                  <div className="col-6 receiver-profil">
                    <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                      <img src="https://bootdey.com/img/Content/avatar/avatar8.png" alt="avatar" />
                    </a>
                    <div className="chat-about">
                      <h6 className="m-b-0">Aiden Chavez</h6>
                      <small>Last seen: 2 hours ago</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="chat-history">
                <ul className="m-b-0">
                  {messages.map((message) => (
                    <li key={message.message_Id} className="clearfix">
                      <div className="message-data">
                        <span className="message-data-time">{new Date(message.message_Date).toLocaleString()}</span>
                      </div>
                      <div className={`message ${message.person_Id === 45 ? 'my-message' : 'other-message float-right'}`}>{message.message_Text}</div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="chat-message clearfix">
                <div className="input-group mb-0">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fa fa-paper-plane" aria-hidden="true"></i></span>
                  </div>
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fa fa-paperclip" aria-hidden="true"></i></span>
                  </div>
                  <input type="text" className="form-control" placeholder="Enter text here..." />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
