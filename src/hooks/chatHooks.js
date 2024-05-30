import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import {
  getMessagesByChannelId,
  getChannelById,
} from "../services/channelService";
import { sendMessage } from "../services/messageService";
import { createAttachments } from "../services/attachmentService";
import {
  getPersonsByChannelId,
  deleteAssociation,
} from "../services/personxchannelservice";
import { getPersonsByRoleInChannel } from "../services/channelpersonrolexpersonxchannelservice";
import { toast } from "react-toastify";
import signalRService from "../signalr-connection";

export const useChatHooks = (channelId, personId, onChannelLeft) => {
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

  const statusClassMap = useMemo(() => ({
    1: 'status-offline',
    2: 'status-active',
    3: 'status-inactive',
    4: 'status-busy',
    5: 'status-online'
  }), []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await getMessagesByChannelId(channelId); 
        if (fetchedMessages.length > 0) {
          setMessages((prevMessages) => [...fetchedMessages, ...prevMessages]);
        } else {
          setHasMore(false); 
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast.error("Une erreur est arrivé lors de la recherche des messages");
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
        toast.error("Une erreur est arrivé.");
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
        toast.error("Erreur lors de la rechercher des personnes du channel");
      }
    };

    setMessages([]);
    setPage(1);
    setHasMore(true);
    setOtherPerson(null);
    setChannel(null);
    setAdminMembers([]);
    setUserMembers([]);

    fetchMessages();
    fetchChannel();
  }, [channelId, personId, page]);

  useEffect(() => {
    if (!isSubscribed.current) {
      signalRService.onMessageReceived((userId, message, channelId) => {
        if (channelId === channelId) {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              person_Id: userId,
              message_Text: message,
              message_Date: new Date().toISOString(),
            },
          ]);
        }
      });
      isSubscribed.current = true;
    }
  }, [channelId]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" && files.length === 0) return;

    const messageDto = {
      MessageText: newMessage,
      ChannelId: channelId,
      PersonId: personId,
      Message_HasAttachment: files.length > 0
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

      signalRService.sendMessage(personId, newMessage, channelId);
      setNewMessage("");
      
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Erreur lors de l'envoi du message");
    }
  };

  const handleFileChange = (event) => {
    setFiles([...event.target.files]);
  };

  const handleLeaveChannel = async () => {
    try {
      await deleteAssociation(personId, channelId);
      onChannelLeft(channelId, channel.channel_Name);
      toast.success("Vous venez de quitter le channel " + channel.channel_Name );
    } catch (error) {
      console.error("Error leaving channel:", error);
      toast.error("Une erreur est arrivé, vous n'avez pas quitter le channel " + channel.channel_Name);
    }
  };

  const handleScroll = useCallback(() => {
    if (listRef.current) {
      if (listRef.current.scrollTop === 0 && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [hasMore]);

  return {
    messages,
    setNewMessage,
    newMessage,
    files,
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
  };
};
