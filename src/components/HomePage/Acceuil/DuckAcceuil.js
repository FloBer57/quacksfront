import React from 'react';
import './DuckAcceuil.css';


const DuckAccueil = (person) => {

    if (!person) {
      return <div>Loading person data...</div>;
    }
  
    return (
<>
  <input type="checkbox" name="light" id="light" />
  <input type="checkbox" name="night" id="night" />
  <div className="sky">
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
    <i />
    <i />
    <i />
    <i />
    <i />
    <i />
  </div>
  <div className="sea">
    <span />
  </div>
  <div className="content">
    <div className="lighthouse">    
      <div className="base" />
      <div className="tower" />
      <div className="top" />
      <div className="roof" />
      <div className="light" />
    </div>
    <div className="lighthouse">
      <div className="base" />
      <div className="tower" />
    </div>
    <label htmlFor="light" />
  </div>
  <label htmlFor="night" />
</>




    )}; 

    export default DuckAccueil;