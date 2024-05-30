import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  getAllChannels,
  deleteChannel
} from '../services/channelService';
import {
  getAllChannelTypes
} from '../services/channelTypeService';
import {
  getAllPersons,
  updatePerson,
  deletePerson,
  createPerson
} from '../services/personService';
import {
  getJobTitles
} from '../services/jobTitleService';
import {
  getUserRoles
} from '../services/personRoles';
import Papa from 'papaparse';

// Hook for channel list
export const useChannelList = (personId) => {
  const [channels, setChannels] = useState([]);
  const [channelTypes, setChannelTypes] = useState([]);

  useEffect(() => {
    const fetchChannelsAndTypes = async () => {
      try {
        const [channelsData, channelTypesData] = await Promise.all([getAllChannels(), getAllChannelTypes()]);
        setChannels(channelsData);
        setChannelTypes(channelTypesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchChannelsAndTypes();
  }, []);

  const handleDeleteChannel = async (channelId) => {
    console.log(channelId, personId);
    try {
      await deleteChannel(channelId, personId);
      setChannels(channels.filter(channel => channel.channel_Id !== channelId));
      toast.success('Channel supprimé avec succés');
    } catch (error) {
      console.error('Failed to delete channel:', error);
      toast.error('Une erreur lors de la suppression du channel');
    }
  };

  const getChannelTypeName = (channelTypeId) => {
    const channelType = channelTypes.find(type => type.channelType_Id === channelTypeId);
    return channelType ? channelType.channelType_Name : 'Unknown Type';
  };

  return {
    channels,
    handleDeleteChannel,
    getChannelTypeName
  };
};

// Hook for user list
export const useUserList = () => {
  const [users, setUsers] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    const fetchUsersAndJobTitlesAndRoles = async () => {
      try {
        const usersData = await getAllPersons();
        const jobTitlesData = await getJobTitles();
        const userRolesData = await getUserRoles();
        setUsers(usersData);
        setJobTitles(jobTitlesData);
        setUserRoles(userRolesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUsersAndJobTitlesAndRoles();
  }, []);

  const getJobTitleName = (userJobTitleId) => {
    const jobTitle = jobTitles.find(title => title.personJob_TitleId === userJobTitleId);
    return jobTitle ? jobTitle.personJobTitle_Name : 'Aucun titre';
  };

  const getUserRoleName = (userRoleId) => {
    const userRole = userRoles.find(role => role.personRole_Id === userRoleId);
    return userRole ? userRole.personRole_Name : 'Aucun titre';
  };

  const handleJobTitleChange = async (userId, newJobTitleId) => {
    try {
      await updatePerson(userId, { jobTitleId: newJobTitleId });
      toast.success("Le Job à bien été changé!");
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.person_Id === userId ? { ...user, personJobTitle_Id: newJobTitleId } : user
        )
      );
    } catch (error) {
      toast.error("Erreur au moment de la modification du Job.");
      console.error('Error updating job title:', error);
    }
  };

  const handleUserRoleChange = async (userId, newRoleId) => {
    try {
      await updatePerson(userId, { roleId: newRoleId });
      toast.success("Le Role à bien été changé!");
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.person_Id === userId ? { ...user, personRole_Id: newRoleId } : user
        )
      );
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error("Erreur lors du changement du role")
    }
  };

  const handleDeletePerson = async (userId) => {
    try {
      await deletePerson(userId);
      toast.success("L'utilisateur a bien été supprimé!");
      setUsers(prevUsers => prevUsers.filter(user => user.person_Id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error("Erreur lors de la suppression");
    }
  };

  return {
    users,
    jobTitles,
    userRoles,
    getJobTitleName,
    getUserRoleName,
    handleJobTitleChange,
    handleUserRoleChange,
    handleDeletePerson
  };
};

// Hook for creating account
export const useCreateAccount = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [jobTitleId, setJobTitleId] = useState('');
  const [jobTitles, setJobTitles] = useState([]);

  useEffect(() => {
    const fetchJobTitles = async () => {
      try {
        const jobTitlesData = await getJobTitles();
        setJobTitles(jobTitlesData);
      } catch (error) {
        console.error('Error fetching job titles:', error);
      }
    };

    fetchJobTitles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createPersonDTO = {
      email,
      firstName,
      lastName,
      phoneNumber,
      jobTitle_Id: jobTitleId,
    };

    try {
      await createPerson(createPersonDTO);
      toast.success('Utilisateur créé avec succès!');
      setEmail('');
      setFirstName('');
      setLastName('');
      setPhoneNumber('');
      setJobTitleId('');
    } catch (error) {
      toast.error(`Erreur lors de la création de l'utilisateur`);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: async (results) => {
          const users = results.data;
          for (const user of users) {
            const createPersonDTO = {
              email: user.FirstName + ' ' + user.LastName,
              firstName: user.FirstName,
              lastName: user.LastName,
              phoneNumber: user.PhoneNumber,
              jobTitle_Id: jobTitles.find(job => job.personJobTitle_Name === user.JobTitle)?.personJob_TitleId || '',
            };
            try {
              await createPerson(createPersonDTO);
            } catch (error) {
              toast.error(`Erreur lors de la création de l'utilisateur`);
            }
          }
          toast.success('Tous les utilisateurs ont été créés avec succès à partir du CSV!');
        },
      });
    }
  };

  return {
    email,
    setEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phoneNumber,
    setPhoneNumber,
    jobTitleId,
    setJobTitleId,
    jobTitles,
    handleSubmit,
    handleFileUpload
  };
};
