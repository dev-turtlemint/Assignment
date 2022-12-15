import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Taskbar from "../components/taskbar";
import "../App.css";

function HomePage() {
  const navigate = useNavigate();
  const data = [1, 2, 3, 4, 5, 6, 7, 8];
  const [loading, setLoading] = useState(true);
  const [finalData, setFinalData] = useState(
    Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => undefined))
  );
  const days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

  var result = [];
  var today = new Date();
  var dd = today.getDate();
  for (var a = 0; a < 8; a++) {
    result.push(dd + a);
  }
  var d = today.getDay();

  const setData = (data) => {
    data.record.forEach((element, index) => {
      if (Number(element.date) >= dd) {
        let copy = [...finalData];
        copy[Number(element.date) - dd][Number(element.seat.number) - 1] =
          element.seat.name;
        setFinalData(copy);
      }
    });

    setLoading(true);
    // for (let j = 0; j < 8; j++) {
    //   for (let k = 0; k < 8; k++) {
    //     console.log(finalData[j][k]);
    //   }
    // }
  };

  const getData = async () => {
    const req = await fetch("http://localhost:1337/api/dashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await req.json();
    setData(data);

    if (data.status !== "ok") {
      alert(data.error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="outerBox">
      <Header />
      <h2>Home Page</h2>
      <Taskbar />
      {loading && (
        <div className="login">
          <form className="loginForm">
            <div
              style={{
                display: "flex",
                alignItems: "end",
                justifyContent: "end",
              }}
            >
              <button
                onClick={() => {
                  navigate("/booking");
                }}
              >
                Book Seat
              </button>
            </div>
            <div className="room">
              <div className="HPHeader">
                <p style={{ width: "20%" }}>Dates</p>
                <p style={{ width: "80%" }}>Seats</p>
              </div>
              <div>
                {result.map((date, i) => {
                  return (
                    <div className="date">
                      <input
                        type="text"
                        key={i}
                        placeholder={`${date} - ${days[(d + i) % 7]}`}
                        style={{ textAlign: "center" }}
                      />
                      <div className="seat">
                        {data.map((seat, id) => {
                          return (
                            <div className="aSeat">
                              <input
                                type="text"
                                key={id}
                                placeholder={
                                  typeof finalData[date - dd][seat - 1] ===
                                  "undefined"
                                    ? seat
                                    : finalData[date - dd][seat - 1]
                                }
                                className="eachSeat"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default HomePage;
