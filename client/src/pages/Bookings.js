import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Calendar from "react-calendar";
import jwt from "jsonwebtoken";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import Taskbar from "../components/taskbar";

export default function Booking() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("E-mail");
  const [reservedSeat, setReservedSeat] = useState([]);
  const [selectDate, setSelectDate] = useState(null);
  const checkList = ["1", "2", "3", "4", "5", "6", "7", "8"];

  const data = [1, 2, 3, 4, 5, 6, 7, 8];
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
        console.log(finalData);
      }
    });
  };

  const checkIfVacant = (reservedSeat, selectDate) => {
    console.log(selectDate.getDate(), Number(reservedSeat));
    if(finalData[Number(selectDate.getDate()) - dd][Number(reservedSeat) - 1] === undefined){
      return true;
    }
    else return false;
  }

  const getData = async () => {
    const req = await fetch("http://localhost:1337/api/dashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await req.json();
    console.log(data);
    setData(data);

    if (data.status !== "ok") {
      alert(data.error);
    }
  };

  const getSeatNumber = (e) => {
    let newSeat = e.target.value;
    if (reservedSeat.includes(newSeat)) {
      e.disabled = true;
      if (reservedSeat.includes(newSeat)) {
        setReservedSeat(reservedSeat.filter((seat) => seat !== newSeat));
      }
    } else {
      setReservedSeat([...reservedSeat, newSeat]);
    }
  };

  const handleSubmitDetails = async (e) => {
    e.preventDefault();
    const isVacant = checkIfVacant(reservedSeat, selectDate);
    if(isVacant){
      const req = await fetch("http://localhost:1337/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          seat: reservedSeat,
          date: selectDate.getDate(),
        }),
      });
      const data = await req.json();
      if (data.status === "ok") {
        alert("Seat Booked Successfully!");
        navigate("/profile");
      } else {
        alert(data.error);
      }
    }
    else alert('Seat Already Booked !');

    
  };

  const handleCheck = (event) => {
    var updatedList = [...reservedSeat];
    if (event.target.checked) {
      updatedList = [...reservedSeat, event.target.value];
    } else {
      updatedList.splice(reservedSeat.indexOf(event.target.value), 1);
    }
    setReservedSeat(updatedList);
  };

  const getToken = async () => {
    const token = await localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      setEmail(user.email);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
      }
    }
  };

  useEffect(() => {
    getToken();
    getData();
  }, []);

  return (
    <div className="outerBox">
      <div className="glassDesign">
        <Header />
        <Taskbar />
        <div className="ss">
          <div className="row spaceAround">
            <div className="column1">
              <div className="plane">
                <form onChange={(e) => getSeatNumber(e)}>
                  <label htmlFor="Seats ">Select Seat</label>
                  <ol className="seats" type="A">
                    {checkList.map((item, index) => (
                      <li className="seat" key={index}>
                        <input
                          type="checkbox"
                          value={item}
                          id={item}
                          onChange={handleCheck}
                        />
                        <label htmlFor={item}>{item}</label>
                      </li>
                    ))}
                  </ol>
                </form>
              </div>
            </div>
            <div className="column2">
              <label htmlFor="Dates">Select Dates</label>
              <div>
                <Calendar
                  onChange={(selectDate) => {
                    setSelectDate(selectDate);
                  }}
                  value={selectDate}
                  minDate={new Date()}
                  maxDate={
                    new Date(new Date().setDate(new Date().getDate() + 7))
                  }
                />
              </div>
              <div className="seatInfo">
                <form>
                  <input value={email} readOnly />
                  <input value={reservedSeat} readOnly />
                  {selectDate && (
                    <input value={selectDate.getDate()} readOnly />
                  )}
                  <div>
                    <button
                      onClick={(e) => handleSubmitDetails(e)}
                      className="btn btn-info seatBT"
                    >
                      Confirm Details
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
