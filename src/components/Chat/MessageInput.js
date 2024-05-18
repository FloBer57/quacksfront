import React from 'react';

const MessageInput = ({ newMessage, setNewMessage, handleSendMessage, handleFileChange }) => {

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
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
            onChange={handleFileChange}
            multiple
            style={{ display: 'none' }}
            id="fileInput"
          />
          <label htmlFor="fileInput" className="btn btn-secondary btn-sendattachment">
            <i className="fa fa-paperclip" aria-hidden="true"></i>
          </label>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
