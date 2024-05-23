import React from 'react';
import { Dropdown, Table, Button } from 'react-bootstrap';
import './AdminPageUserList.css';
import { useUserList } from '../../hooks/adminHooks';

const AdminPageUserList = () => {
  const {
    users,
    jobTitles,
    userRoles,
    getJobTitleName,
    getUserRoleName,
    handleJobTitleChange,
    handleUserRoleChange,
    handleDeletePerson
  } = useUserList();

  return (
    <div className="p-3 admin-list" style={{ flex: 1 }}>
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
