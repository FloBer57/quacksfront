import React from 'react';

const MessageItem = ({ message, personId }) => {
  return (
    <li className="clearfix">
      <div className="message-data">
        <span className="message-data-time">
          {new Date(message.message_Date).toLocaleString()}
        </span>
      </div>
      <div
        className={`message ${
          message.person_Id !== personId
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
  );
};

export default MessageItem;
