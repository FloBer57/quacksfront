import React, { useEffect, useRef } from 'react';
import MessageItem from './MessageItem';

const MessageList = ({ messages, personId, channelTypeId }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={channelTypeId === 1 ? "chat-history" : "chat-history chat-historychanneltype2"}>
      <ul className="m-b-0">
        {messages.map((message, index) => (
          <MessageItem key={index} message={message} personId={personId} />
        ))}
        <div ref={messagesEndRef} />
      </ul>
    </div>
  );
};

export default MessageList;
