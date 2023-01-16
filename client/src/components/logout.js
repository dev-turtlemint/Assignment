import React from "react";

function Logout() {

    const removeLogin = (event) => {
        // event.preventDefault();
        localStorage.clear();
    };

  return (
    <button onClick={removeLogin} className="glassDesign" style={{ justifySelf: "end"}}>
        Logout
    </button>
  );
}

export default Logout;
