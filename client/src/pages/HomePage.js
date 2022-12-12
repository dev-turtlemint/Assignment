import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";

function HomePage() {
  const navigate = useNavigate();
  const [data, setData] = useState([
    { 1: "" },
    { 2: "" },
    { 3: "" },
    { 4: "" },
    { 5: "" },
    { 6: "" },
    { 7: "" },
    { 8: "" },
  ]);

  var result = [];
  var today = new Date();
  var dd = today.getDate();
  for (var i = 0; i < 8; i++) {
    result.push(dd + i);
  }
  return (
    <div>
      <Header />
      <h2>Home Page</h2>
      <div className="login">
        <form className="loginForm">
          <div
            style={{
              display: "flex",
              paddingBottom: "5%",
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
            <div>
              {result.map((date, id) => {
                return (
                  <div className="date">
                    <input
                      type="text"
                      key={id}
                      placeholder={date}
                      style={{ textAlign: "center" }}
                    />
                    <div className="seat">
                      {data.map((seat, id) => {
                        return (
                          <div className="seat">
                            <input
                              type="text"
                              key={id}
                              placeholder={Object.keys(seat)}
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
    </div>
  );
}

export default HomePage;
