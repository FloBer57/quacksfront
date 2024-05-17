// src/components/Accueil.js
import React from "react";
import "./Acceuil.css";

const url = "https://localhost:7019/";

const Accueil = ({ person }) => {
  console.log("Person in Accueil component:", person); // Log the person data

  if (!person) {
    return <div>Loading person data...</div>;
  }

  return (
    <div class="acceuil">
      <a className="navbar-brand" href="#">
        <img
          className="ProfilePicture"
          src={`${url}${person.person_ProfilPicturePath}`}
          height="40"
          alt="Profile"
        />
      </a>
      <h1>Welcome, {person.person_FirstName} {person.person_LastName}!</h1>
      <p>Your ID: {person.person_Id}</p>
      <p>Email: {person.person_Email}</p>
      <p>Phone Number: {person.person_PhoneNumber}</p>
      <p>Description: {person.person_Description}</p>
    </div>
  );
};

export default Accueil;
