import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Chat.css";
import "react-toastify/dist/ReactToastify.css";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import ChannelHeader from "./ChannelHeader";
import { useChatHooks } from "../../../hooks/chatHooks";
import signalRService from "../../../signalr-connection";

const Chat = ({ channelId, personId, onChannelLeft }) => {
  const {
    messages,
    setNewMessage,
    newMessage,
    handleFileChange,
    handleSendMessage,
    handleLeaveChannel,
    otherPerson,
    channel,
    adminMembers,
    userMembers,
    statusClassMap,
    handleScroll,
    listRef
  } = useChatHooks(channelId, personId, onChannelLeft);

  useEffect(() => {
    signalRService.joinChannel(channelId);

    return () => {
      signalRService.exitChannel(channelId);
    };
  }, [channelId]);

  const renderMembers = (members, roleName) => {
    return (
      <div key={roleName}>
        <h5>{roleName}</h5>
        {members.map((member) => (
          <div key={member.person_Id} className="member-item">
            <i className={`user-channel-statut fas fa-circle fa-lg ${statusClassMap[member.personStatut_Id]}`}></i>
            <img
              className="user-channel-statut-picture"
              src={`https://localhost:7019/${member.person_ProfilPicturePath}`}
              alt="avatar"
              width="30"
              height="30"
            />
            <span>
              {member.person_FirstName} {member.person_LastName} {member.person_PersonStatut}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className={
        channel?.channelType_Id === 2
          ? "container-fluid chat-container chat-containerchanneltype2"
          : "container-fluid chat-container"
      }
    >
      <div className="row clearfix">
        <div className={channel?.channelType_Id === 2 ? "col-10" : "col-12"}>
          <div className="card chat-app">
            <div className="chat" onScroll={handleScroll} ref={listRef}>
              {channel?.channelType_Id === 1 && (
                <ChannelHeader otherPerson={otherPerson} />
              )}
              <MessageList
                messages={messages}
                personId={personId}
                channelTypeId={channel?.channelType_Id}
              />
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
            <i className="fa fa-wrench"></i>
            <div className="member-list-title">
              <img
                className="member-list-channelimage"
                src={`https://localhost:7019/${channel.channel_ImagePath}`}
                alt="channel"
              />
              {channel.channel_Name}
              {channel.channel_Description}
            </div>

            {renderMembers(adminMembers, "Administrateur")}
            {renderMembers(userMembers, "Utilisateur")}
            <button
              onClick={handleLeaveChannel}
              className="btn btn-danger col-2 mt-2 buttonchannellist"
            >
              Quitter le canal
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
