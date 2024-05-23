// src/components/Accueil.js
import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText
} from 'mdb-react-ui-kit';
import "./Acceuil.css";

const url = "https://localhost:7019/";

const Accueil = ({ person }) => {

  if (!person) {
    return <div>Loading person data...</div>;
  }

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '600px' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <MDBCardImage 
                src={`${url}${person.person_ProfilPicturePath}`} 
                className="rounded-circle mb-3" 
                style={{ width: '150px' }} 
                alt="Profile"
              />
              <MDBCardTitle className='fw-bold mb-2 text-uppercase'>Welcome back, {person.person_FirstName} {person.person_LastName}!</MDBCardTitle>
              <MDBCardText className="text-white mb-4">
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Accueil;
