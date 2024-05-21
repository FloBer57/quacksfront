import React, { useEffect, useState } from 'react';
import './MessageItem.css'; // Importez le fichier CSS pour les styles
import { getAttachmentByMessageId } from '../../services/messageService';

const MessageItem = ({ message, personId }) => {
  const [attachments, setAttachments] = useState([]);

  useEffect(() => {
    const fetchAttachments = async () => {
      try {
        const fetchedAttachments = await getAttachmentByMessageId(message.message_Id);
        if (fetchedAttachments && fetchedAttachments.length > 0) {
          setAttachments(fetchedAttachments);
        }
      } catch (error) {
        if (error.response && error.response.status !== 404) {
          console.error("Error fetching attachments:", error);
        }
      }
    };

    fetchAttachments();
  }, [message.message_Id]);

  return (
    <li className='clearfix'>
      <div className={
          message.person_Id !== personId
            ? 'message-data'
            : 'message-data message-data-other'
        }>
        <span className={
          message.person_Id !== personId
            ? 'message-data-time'
            : 'message-data-time message-data-time-other'
        }>
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
        {attachments.length > 0 && (
          <div className="attachments">
            {attachments.map((attachment, index) => (
              <div key={index} className="attachment">
                {console.log(attachment)}
                <a
                  href={`https://localhost:7019${attachment.attachmentThing}`} // Assurez-vous que le chemin est correct
                  target="_blank"
                  rel="noopener noreferrer"
                  className="attachment-link"
                  download={attachment.Attachment_Name}
                >                <i className="fa fa-paperclip attachment-icon" aria-hidden="true"></i>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </li>
  );
};

export default MessageItem;
