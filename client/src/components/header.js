import React from "react";
import Logout from "./logout";

function Header() {
  return (
    <div className="flexSpaceBtw">
      <div>
        <h2>Office Seat Booking App</h2>
      </div>
      <Logout />
    </div>
  );
}

export default Header;
