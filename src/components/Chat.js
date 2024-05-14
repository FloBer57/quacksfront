import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Chat.css'; 

const Chat = () => {
  return (
    <div className="container-fluid chat-container"> {/* Utilisez container-fluid pour toute la largeur */}
      <div className="row clearfix">
        <div className="col-12">
          <div className="card chat-app">
            <div className="chat">
              <div className="chat-header clearfix">
                <div className="row">
                  <div className="col-6">
                    <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                      <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
                    </a>
                    <div className="chat-about">
                      <h6 className="m-b-0">Aiden Chavez</h6>
                      <small>Last seen: 2 hours ago</small>
                    </div>
                  </div>
                  <div className="col-6 text-right">
                    <a href="javascript:void(0);" className="btn btn-outline-secondary"><i className="fa fa-camera"></i></a>
                    <a href="javascript:void(0);" className="btn btn-outline-primary"><i className="fa fa-image"></i></a>
                    <a href="javascript:void(0);" className="btn btn-outline-info"><i className="fa fa-cogs"></i></a>
                    <a href="javascript:void(0);" className="btn btn-outline-warning"><i className="fa fa-question"></i></a>
                  </div>
                </div>
              </div>
              <div className="chat-history">
                <ul className="m-b-0">
                  {chatMessages.map((message, index) => (
                    <li key={index} className="clearfix">
                      <div className={`message-data ${message.align === 'right' ? 'text-right' : ''}`}>
                        <span className="message-data-time">{message.time}</span>
                        {message.imgSrc && <img src={message.imgSrc} alt="avatar" />}
                      </div>
                      <div className={`message ${message.align === 'right' ? 'other-message float-right' : 'my-message'}`}>{message.text}</div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="chat-message clearfix">
                <div className="input-group mb-0">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fa fa-send"></i></span>
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

const chatMessages = [
  { time: "10:10 AM, Today", text: "Hi Aiden, how are you? How is the project coming along?", align: "right", imgSrc: "https://bootdey.com/img/Content/avatar/avatar7.png" },
  { time: "10:12 AM, Today", text: "Are we meeting today?", align: "left", imgSrc: null },
  { time: "10:15 AM, Today", text: "Project has been already finished and I have results to show you.", align: "left", imgSrc: null }
];

export default Chat;
