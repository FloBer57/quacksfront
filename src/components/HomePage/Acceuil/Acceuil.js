// src/components/Accueil.js
import React from "react";
import "./Acceuil.css";
import DuckAccueil from "./DuckAcceuil";
import { MDBCardTitle } from "mdb-react-ui-kit";

const url = "https://localhost:7019/";

const Accueil = ({ person }) => {

  if (!person) {
    return <div>Loading person data...</div>;
  }

  return (
    <div className="fit-content phare">
    <DuckAccueil></DuckAccueil>
    </div>
  );
};

export default Accueil;
