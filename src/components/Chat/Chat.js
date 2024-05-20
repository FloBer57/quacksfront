import React, { useEffect, useState, useRef, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Chat.css";
import {
  getMessagesByChannelId,
  getChannelById,
} from "../../services/channelService";
import { sendMessage } from "../../services/messageService";
import { createAttachments } from "../../services/attachmentService";
import {
  getPersonsByChannelId,
  deleteAssociation,
} from "../../services/personxchannelservice";
import { getPersonsByRoleInChannel } from "../../services/channelpersonrolexpersonxchannelservice";
import signalRService from "../../signalr-connection";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import ChannelHeader from "./ChannelHeader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Chat = ({ channelId, personId, onChannelLeft }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [otherPerson, setOtherPerson] = useState(null);
  const [channel, setChannel] = useState(null);
  const [adminMembers, setAdminMembers] = useState([]);
  const [userMembers, setUserMembers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const isSubscribed = useRef(false);
  const listRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async (page) => {
      try {
        const fetchedMessages = await getMessagesByChannelId(channelId, page, 20); // fetch 20 messages at a time
        if (fetchedMessages.length > 0) {
          setMessages((prevMessages) => [...fetchedMessages, ...prevMessages]);
        } else {
          setHasMore(false); // no more messages to load
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast.error(error.message);
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
        console.error("Error fetching channel or persons:", error);
        toast.error(error.message);
      }
    };

    const fetchMembersByRole = async (channelId) => {
      try {
        const fetchedAdminMembers = await getPersonsByRoleInChannel(channelId, 1);
        const fetchedUserMembers = await getPersonsByRoleInChannel(channelId, 2);
        setAdminMembers(fetchedAdminMembers);
        setUserMembers(fetchedUserMembers);
      } catch (error) {
        console.error("Error fetching members by role:", error);
        toast.error(error.message);
      }
    };

    // Reset states when channelId changes
    setMessages([]);
    setPage(1);
    setHasMore(true);
    setOtherPerson(null);
    setChannel(null);
    setAdminMembers([]);
    setUserMembers([]);

    fetchMessages(page);
    fetchChannel();
  }, [channelId, personId, page]);

  useEffect(() => {
    if (!isSubscribed.current) {
      signalRService.onMessageReceived((userId, message) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            person_Id: userId,
            message_Text: message,
            message_Date: new Date().toISOString(),
          },
        ]);
      });
      isSubscribed.current = true;
    }
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" && files.length === 0) return;

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
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(error.message);
    }
  };

  const handleFileChange = (event) => {
    setFiles([...event.target.files]);
  };

  const handleLeaveChannel = async () => {
    try {
      await deleteAssociation(personId, channelId);
      onChannelLeft(channelId, channel.channel_Name);
    } catch (error) {
      console.error("Error leaving channel:", error);
      toast.error(error.message);
    }
  };

  const handleScroll = useCallback(() => {
    if (listRef.current) {
      if (listRef.current.scrollTop === 0 && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [hasMore]);

  const renderMembers = (members, roleName) => {
    return (
      <div key={roleName}>
        <h5>{roleName}</h5>
        {members.map((member) => (
          <div key={member.person_Id} className="member-item">
            <img
              src={`https://localhost:7019/${member.person_ProfilPicturePath}`}
              alt="avatar"
              width="30"
              height="30"
            />
            <span>
              {member.person_FirstName} {member.person_LastName}
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
              {channel?.channelType_Id === 1 ? (
                <ChannelHeader otherPerson={otherPerson} />
              ) : (
                ""
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
            {renderMembers(adminMembers, "Administrateur")}
            {renderMembers(userMembers, "Utilisateur")}
            <button
              onClick={handleLeaveChannel}
              className="btn btn-danger mt-2"
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
