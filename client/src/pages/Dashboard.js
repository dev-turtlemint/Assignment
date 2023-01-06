import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import "../App.css";
import Taskbar from "../components/taskbar";

function Dashboard() {
  const navigate = useNavigate();
  const [seat, setSeat] = useState("");
  const [tempSeat, setTempSeat] = useState("");

  async function populateSeat() {
    const req = await fetch("http://localhost:1337/api/seat", {
      headers: {
        "x-access-token": localStorage.getItem("tokenData"),
      },
    });
    const data = await req.json();
    if (data.status === "ok") {
      setSeat(data.seat);
    } else {
      alert(data.error);
    }
  }

  async function updateSeat(event) {
    event.preventDefault();

    const req = await fetch("http://localhost:1337/api/seat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        seat: tempSeat,
      }),
    });
    const data = await req.json();
    if (data.status === "ok") {
      setSeat(tempSeat);
      setTempSeat("");
    } else {
      alert(data.error);
    }
  }

  const getToken = async () => {
    const token = localStorage.getItem("tokenData");
    const data = JSON.parse(token);
    if (data) {
      const user = jwt.decode(data.token);
      // console.log(data);
      // console.log(user);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
      } else {
        console.log(user);
        populateSeat();
      }
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <div>
      <div className="outerBox">
        <div className="glassDesign">
          <Header />
          <Taskbar />
          <div>
            <h1>Your Seat: {seat || "No Seat found"}</h1>
            <form onSubmit={updateSeat}>
              <input
                type="text"
                placeholder="Seat"
                value={tempSeat}
                onChange={(e) => {
                  setTempSeat(e.target.value);
                }}
              />
              <input type="submit" value="Update Seat" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
