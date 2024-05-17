// src/components/Accueil.js
import React from "react";

const navigate = useNavigate();

const handleRedirect = () => {
  navigate("/home");
};
const ListMember = () => {
  return (
    <div className="col-4" href="#" onClick={handleRedirect}>
    </div>
  );
};
export default ListMember;
