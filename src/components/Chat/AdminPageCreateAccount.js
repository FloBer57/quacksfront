import React, { useEffect, useState } from 'react';
import { Dropdown, Table, Button } from 'react-bootstrap';
import { getAllPersons, updatePerson, deletePerson } from '../../services/personService';
import { getJobTitles } from '../../services/jobTitleService';
import { getUserRoles } from '../../services/personRoles';
import { toast } from "react-toastify";
import './AdminPageUserList.css';

const AdminPageUserList = () => {
  const [users, setUsers] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    const fetchUsersAndJobTitlesAndRoles = async () => {
      try {
        const usersData = await getAllPersons();
        const jobTitlesData = await getJobTitles();
        const userRolesData = await getUserRoles();
        console.log('Users:', usersData);
        console.log('Job Titles:', jobTitlesData);
        console.log('User Roles:', userRolesData);
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
    if (!jobTitles || jobTitles.length === 0) {
      return 'Aucun titre';
    }
    const jobTitle = jobTitles.find((title) => title.personJob_TitleId === userJobTitleId);
    return jobTitle ? jobTitle.personJobTitle_Name : 'Aucun titre';
  };

  const getUserRoleName = (userRoleId) => {
    if (!userRoles || userRoles.length === 0) {
      return 'Aucun titre';
    }
    const userRole = userRoles.find((role) => role.personRole_Id === userRoleId);
    return userRole ? userRole.personRole_Name : 'Aucun titre';
  };

  const handleJobTitleChange = async (userId, newJobTitleId) => {
    try {
      await updatePerson(userId, { personJobTitle_Id: newJobTitleId });
      console.log('Job title successfully updated for user:', userId, newJobTitleId);
      toast.success("Le Job à bien été changé!");
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.person_Id === userId ? { ...user, personJobTitle_Id: newJobTitleId } : user
        )
      );
    } catch (error) {
      console.error('Error updating job title:', error);
    }
  };

  const handleUserRoleChange = async (userId, newRoleId) => {
    try {
      await updatePerson(userId, { personRole_Id: newRoleId });
      console.log('User role successfully updated for user:', userId, newRoleId);
      toast.success("Le Role à bien été changé!");
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.person_Id === userId ? { ...user, personRole_Id: newRoleId } : user
        )
      );
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const handleDeletePerson = async (userId) => {
    try {
      await deletePerson(userId);
      console.log('User successfully deleted:', userId);
      toast.success("L'utilisateur a bien été supprimé!");
      setUsers((prevUsers) => prevUsers.filter((user) => user.person_Id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="p-3 admin-users-list" style={{ flex: 1 }}>
      <h2>Liste des Utilisateurs</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Intitulé du poste</th>
            <th>Rôle</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.person_Id}>
              <td>{user.person_FirstName} {user.person_LastName}</td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    {getJobTitleName(user.personJobTitle_Id)}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {jobTitles.map((jobTitle) => (
                      <Dropdown.Item
                        key={`jobTitle-${jobTitle.personJob_TitleId}`}
                        onClick={() => handleJobTitleChange(user.person_Id, jobTitle.personJob_TitleId)}
                      >
                        {jobTitle.personJobTitle_Name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    {getUserRoleName(user.personRole_Id)}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {userRoles.map((role) => (
                      <Dropdown.Item
                        key={`role-${role.personRole_Id}`}
                        onClick={() => handleUserRoleChange(user.person_Id, role.personRole_Id)}
                      >
                        {role.personRole_Name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </td>
              <td>
                <Button variant="danger" onClick={() => handleDeletePerson(user.person_Id)}>Supprimer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminPageUserList;
