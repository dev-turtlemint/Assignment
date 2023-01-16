import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();

    const removeLogin = (event) => {
        // event.preventDefault();
        localStorage.clear();
        navigate('/login');
    };

  return (
    <button onClick={removeLogin} className="glassDesign" style={{ justifySelf: "end"}}>
        Logout
    </button>
  );
}

export default Logout;
