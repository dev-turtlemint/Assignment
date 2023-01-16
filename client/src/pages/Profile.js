import React, { useEffect, useState } from "react";
import Header from "../components/header";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import Taskbar from "../components/taskbar";

function Profile() {
  const navigate = useNavigate();
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  const [seat, setSeat] = useState("");
  const [date, setDate] = useState("");
  const [userData, setUserData] = useState([]);

  const getToken = async () => {
    const token = await localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      // setEmail(user.email);
      // setName(user.name);
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
      setUserData(data.user);
      // setLoading(false);
    }

    if (data.status !== "ok") {
      alert(data.error);
    }
  };

  const handleCanceling = async (item) => {
    // e.preventDefault();
    setSeat(item.number);
    setDate(item.date);
    const req = await fetch("http://localhost:1337/api/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        seat: item.number,
        date: item.date,
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

  const column = [
    { header: "Date", field: "date" },
    { header: "Email", field: "email" },
    { header: "Name", field: "name" },
    { header: "Seat Number", field: "number" },
    { header: "Booking Time", field: "time" },
    { header: "Cancel", field: "cancel" },
  ];

  return (
    <div className="outerBox">
      <div className="glassDesign box">
        <Header />
        <Taskbar />
        <div>
          {userData.length > 0 ? (
            <div className="users-table-container">
              <table className="users-table">
                <thead className="users-table__head">
                  <tr>
                    {column &&
                      column.map((head, id) => <th key={id}>{head.header}</th>)}
                  </tr>
                </thead>
                <tbody className="users-table__body">
                  {userData &&
                    userData.map((item, id) => (
                      <tr key={id}>
                        {column &&
                          column.map((head, i) =>
                            head.field !== "cancel" ? (
                              head.field === "time" ? (
                                <td key={i}>
                                  {new Date(
                                    item[head.field] * 1000
                                  ).toDateString()}
                                </td>
                              ) : (
                                <td key={i}>{item[head.field]}</td>
                              )
                            ) : (
                              <td key={i}>
                                <button
                                  type="button"
                                  onClick={() => handleCanceling(item)}
                                >
                                  Cancel
                                </button>
                              </td>
                            )
                          )}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <p>No Booking Found!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
