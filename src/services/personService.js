import { get, post, put, del } from '../api/agent';

const API_URL = '/Person';

const getAllPersons = () => get(`${API_URL}/`);
const getPersonById = (id) => get(`${API_URL}/${id}`);
const createPerson = (createPersonDTO) => post(`${API_URL}/`, createPersonDTO);
const createPersonTest = (createPersonTestDTO) => post(`${API_URL}/test`, createPersonTestDTO);
const updatePerson = (id, updatePersonDTO) => put(`${API_URL}/${id}`, updatePersonDTO);
const deletePerson = (id) => del(`${API_URL}/${id}`);
const getPersonsByJobTitle = (jobTitleId) => get(`${API_URL}/ByJobTitle/${jobTitleId}`);
const getPersonsByStatut = (statutId) => get(`${API_URL}/ByStatut/${statutId}`);
const getPersonsByRole = (roleId) => get(`${API_URL}/ByRole/${roleId}`);
const getPersonByEmail = (email) => get(`${API_URL}/ByEmail/${email}`);
const verifyCurrentPassword = (userId, currentPassword) => post(`${API_URL}/verify-password`, { userId, currentPassword });

const uploadProfilePicture = (file) => {
  const formData = new FormData();
  formData.append('file', file);

  return post(`${API_URL}/uploadProfilePicture`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export {
  getAllPersons,
  getPersonById,
  createPerson,
  createPersonTest,
  updatePerson,
  deletePerson,
  getPersonsByJobTitle,
  getPersonsByStatut,
  getPersonsByRole,
  getPersonByEmail,
  verifyCurrentPassword,
  uploadProfilePicture
};