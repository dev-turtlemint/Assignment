import React, { useEffect, useState } from "react";
import Header from "../components/header";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [seat, setSeat] = useState("");
  const [date, setDate] = useState("");

  const getToken = async () => {
    const token = await localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      setEmail(user.email);
      setName(user.name);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
      }
    }
  };

  const getDetails = async () => {
    const req = await fetch("http://localhost:1337/api/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await req.json();
    if (data) {
      setSeat(data.user[0].seat.number);
      setDate(data.user[0].date);
    }

    if (data.status !== "ok") {
      alert(data.error);
    }
  };

  const handleCanceling = async (e) => {
    e.preventDefault();

    const req = await fetch("http://localhost:1337/api/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        seat: seat,
        date: date,
      }),
    });
    const data = await req.json();
    if (data.status === "Deleted") {
      setDate("");
      setSeat("");
      window.location.reload();
    } else {
      alert(data.error);
    }
  };

  useEffect(() => {
    getToken();
    getDetails();
  }, []);

  return (
    <div className="outerBox">
      <Header />
      <div>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Labels and inputs for form data */}
          <div className="field">
            <label className="label">Name</label>
            <input className="input" value={name} type="text" disabled={true} />
          </div>
          <div className="field">
            <label className="label">Email</label>
            <input
              className="input"
              value={email}
              type="email"
              disabled={true}
            />
          </div>
          <div className="field">
            <label className="label">Seat</label>
            <input className="input" value={seat} disabled={true} />
          </div>
          <div className="field">
            <label className="label">Date</label>
            <input className="input" value={date} disabled={true} />
          </div>
          <button type="submit" onClick={handleCanceling}>
            Cancel Booking
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
