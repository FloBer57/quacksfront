import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon
} from 'mdb-react-ui-kit';
import { createPerson } from '../../services/personService';
import { getJobTitles } from '../../services/jobTitleService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminPageCreateAccount.css';
import Papa from 'papaparse';

const AdminPageCreateAccount = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [jobTitleId, setJobTitleId] = useState('');
  const [jobTitles, setJobTitles] = useState([]);
  const navigate = useNavigate();

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
      email: email,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
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
      toast.error(`Erreur lors de la création de l'utilisateur: ${error.message}`);
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
              toast.error(`Erreur lors de la création de l'utilisateur: ${error.message}`);
            }
          }
          toast.success('Tous les utilisateurs ont été créés avec succès à partir du CSV!');
        },
      });
    }
  };

  return (
    <MDBContainer fluid>
      <MDBCard className='text-black m-4' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Créer un utilisateur</p>
              <form onSubmit={handleSubmit} className='w-100'>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="user me-3" size='lg' />
                  <MDBInput label='Prénom' id='firstName' type='text' className='w-100' value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="user me-3" size='lg' />
                  <MDBInput label='Nom' id='lastName' type='text' className='w-100' value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size='lg' />
                  <MDBInput label='Email' id='email' type='email' className='w-100' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="phone me-3" size='lg' />
                  <MDBInput label='Numéro de téléphone' id='phoneNumber' type='text' className='w-100' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="briefcase me-3" size='lg' />
                  <select className="form-select" value={jobTitleId} onChange={(e) => setJobTitleId(e.target.value)} required>
                    <option value="" disabled>Choisir un intitulé de poste</option>
                    {jobTitles.map((jobTitle) => (
                      <option key={jobTitle.personJob_TitleId} value={jobTitle.personJob_TitleId}>
                        {jobTitle.personJobTitle_Name}
                      </option>
                    ))}
                  </select>
                </div>
                <MDBBtn className='mb-4' size='lg' type='submit'>Créer</MDBBtn>
              </form>
              <p className="text-center h5 fw-bold mb-3">Ou</p>
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="file-csv me-3" size='lg' />
                <input type="file" accept=".csv" onChange={handleFileUpload} />
              </div>
              <a href="/path-to-csv-template.csv" download>
                <MDBBtn className='mb-4' size='lg'>Télécharger le modèle CSV</MDBBtn>
              </a>
            </MDBCol>
            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://localhost:7019/Image/WebsiteNeeds/QuacksRegister.png' fluid />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default AdminPageCreateAccount;
