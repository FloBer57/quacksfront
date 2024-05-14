import React from 'react';
import quacksLogo from '../images/QuacksLogo.png'; 

const MyComponent = () => {
  return (
    <div className="brand-wrapper">            
       <h1><a href="https://stackfindover.com/" className="text-decoration-none"><img className="img-fluid  w- h-100 object-fit-cover" loading="lazy" src={quacksLogo} alt="BootstrapBrain Logo" /></a></h1>
    </div>
  );
};

export default MyComponent;
