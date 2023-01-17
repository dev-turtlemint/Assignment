import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Taskbar from "../components/taskbar";
import "../App.css";
import jwt from "jsonwebtoken";

function HomePage() {
  const [date, setDate] = useState();
  const [seat, setSeat] = useState();
  const [email, setEmail] = useState("E-mail");
  const [name, setName] = useState("");
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
        copy[Number(element.date) - dd][Number(element.number) - 1] =
          element.name;
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

  const checkIfVacant = (seat, date) => {
    if (finalData[date - dd][Number(seat) - 1] === undefined) {
      return [true, finalData[date - dd][Number(seat) - 1]];
    } else {
      return [false, finalData[date - dd][Number(seat) - 1]];
    }
  };

  const checkIfAllowed = () => {
    for (let i = 0; i < 8; i++) {
      if (finalData[date - dd][i] === name) {
        return false;
      }
    }
    return true;
  };

  const handleSubmitDetails = async (e) => {
    e.preventDefault();
    const isVacant = checkIfVacant(seat, date);
    console.log(isVacant);
    if (isVacant[0]) {
      if (checkIfAllowed()) {
        const req = await fetch("http://localhost:1337/api/booking", {
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
        if (data.status === "ok") {
          alert("Seat Booked Successfully!");
          navigate("/profile");
        } else {
          alert(data.error);
        }
      } else {
        alert("Only one seat per person per day allowed !");
      }
    } else {
      // console.log(isVacant[1])
      alert("Seat Already Booked!");
    }
  };

  const getData = async () => {
    if (localStorage.getItem("token")) {
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
    }
  };

  const checkInput = (event) => {
    if (seat === undefined || date === undefined) {
      alert("Please enter the Date and Seat No !");
    } else {
      handleSubmitDetails(event);
    }
  };

  // useEffect(() => {
  //   console.log(seat, date);
  // }, [seat, date]);

  // navigate("/booking");

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

  useEffect(() => {
    getData();
    getToken();
  }, []);

  return (
    <div className="outerBox">
      <div className="glassDesign box">
        <Header />
        <Taskbar />
        {loading && (
          <div className="login">
            <form className="loginForm">
              <div className="flexSpaceBtw">
                <div>
                  <label>Seat No</label>
                  <input value={seat} readOnly />
                </div>
                <div>
                  <label>Date</label>
                  <input value={date} readOnly />
                </div>
                <div>
                  <button className="glassDesign" onClick={checkInput}>
                    Book Seat
                  </button>
                </div>
              </div>
              <div className="room">
                <div className="HPHeader">
                  <p style={{ width: "20%" }}>Dates</p>
                  <p style={{ width: "80%" }}>Seats</p>
                </div>
                <div>
                  {result.map((date, i) => {
                    return (
                      <div className="date" key={i}>
                        <input
                          readOnly
                          onClick={(e) => {
                            setDate(`${date}`);
                          }}
                          type="text"
                          key={i}
                          placeholder={`${date} - ${days[(d + i) % 7]}`}
                          style={{ textAlign: "center" }}
                        />
                        <div className="seat">
                          {data.map((seat, id) => {
                            return (
                              <div className="aSeat" key={id}>
                                <input
                                  readOnly
                                  onClick={(e) => {
                                    setSeat(`${id + 1}`);
                                  }}
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
    </div>
  );
}

export default HomePage;
