// src/services/personService.js
import { get, post, put, del } from '../api/agent';
import { handleResponse, handleError } from '../utils/errorHandler';

const API_URL = '/Person';

const getAllPersons = (navigate) => get(`${API_URL}/`).then(handleResponse).catch((error) => handleError(error, navigate));
const getPersonById = (id, navigate) => get(`${API_URL}/${id}`).then(handleResponse).catch((error) => handleError(error, navigate));
const createPerson = (createPersonDTO, navigate) => post(`${API_URL}/`, createPersonDTO).then(handleResponse).catch((error) => handleError(error, navigate));
const createPersonTest = (createPersonTestDTO, navigate) => post(`${API_URL}/test`, createPersonTestDTO).then(handleResponse).catch((error) => handleError(error, navigate));
const updatePerson = (id, updatePersonDTO, navigate) => put(`${API_URL}/${id}`, updatePersonDTO).then(handleResponse).catch((error) => handleError(error, navigate));
const deletePerson = (id, navigate) => del(`${API_URL}/${id}`).then(handleResponse).catch((error) => handleError(error, navigate));
const getPersonsByJobTitle = (jobTitleId, navigate) => get(`${API_URL}/ByJobTitle/${jobTitleId}`).then(handleResponse).catch((error) => handleError(error, navigate));
const getPersonsByStatut = (statutId, navigate) => get(`${API_URL}/ByStatut/${statutId}`).then(handleResponse).catch((error) => handleError(error, navigate));
const getPersonsByRole = (roleId, navigate) => get(`${API_URL}/ByRole/${roleId}`).then(handleResponse).catch((error) => handleError(error, navigate));
const getPersonByEmail = (email, navigate) => get(`${API_URL}/ByEmail/${email}`).then(handleResponse).catch((error) => handleError(error, navigate));

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
};
