import React, { useState } from 'react';

const MessageInput = ({ newMessage, setNewMessage, handleSendMessage, handleFileChange }) => {
  const [filePreviews, setFilePreviews] = useState([]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleFilesChange = (event) => {
    const files = Array.from(event.target.files);
    setFilePreviews(files.map(file => ({ name: file.name, url: URL.createObjectURL(file) })));
    handleFileChange(event);
  };

  return (
    <div className="chat-message clearfix">
      <div className="input-group mb-0">
        <input
          type="text"
          className="form-control"
          placeholder="Enter text here..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <div className="input-group-append">
          <button className="btn btn-primary btn-sendmessage" onClick={handleSendMessage}>
            <i className="fa fa-paper-plane" aria-hidden="true"></i>
          </button>
          <input
            type="file"
            className="btn btn-secondary"
            onChange={handleFilesChange}
            multiple
            style={{ display: 'none' }}
            id="fileInput"
          />
          <label htmlFor="fileInput" className="btn btn-secondary btn-sendattachment">
            <i className="fa fa-paperclip" aria-hidden="true"></i>
          </label>
        </div>
      </div>
      <div className="file-previews">
        {filePreviews.map((file, index) => (
          <div key={index} className="file-preview">
            <i className="fa fa-paperclip" aria-hidden="true"></i> {file.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageInput;
