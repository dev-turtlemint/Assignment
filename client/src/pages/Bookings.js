import React, { useState } from "react";
import Header from "../components/header";

export default function Booking() {
  const [name, setName] = useState([]);
  const [arrowDown, setArrowDown] = useState(false);
  const [reservedSeat, setReservedSeat] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
  ]);
  const [seatNumber, setSeatnumber] = useState([]);

  const getSeatNumber = (e) => {
    renderPassengerData(seatNumber);
    let newSeat = e.target.value;
    if (reservedSeat.includes(newSeat)) {
      e.disabled = true;
      if (seatNumber.includes(newSeat)) {
        setSeatnumber(seatNumber.filter((seat) => seat !== newSeat));
      }
    } else {
      setSeatnumber([...seatNumber, newSeat]);
      setReservedSeat([...reservedSeat, newSeat]);
      console.log(seatNumber);
    }
  };
  const handlePassengerName = (e, seatNo) => {
    e.preventDefault();
    let value = e.target.value;
    // console.log(value)
    if (!value) {
      return setName("name is required");
    } else {
      setName(name.concat(value));
      // setPassengers(prevState => ({ ...prevState, SeatNo: seatNo, Name: value }))
    }
  };
  const handleSubmitDetails = (e) => {
    e.preventDefault();
    setArrowDown(true);
    localStorage.setItem("reservedSeats", JSON.stringify(seatNumber));
    localStorage.setItem("nameData", JSON.stringify(name));
    console.log(name);
  };

  const renderPassengerData = (seatArray) => {
    return seatArray.map((seat, idx) => {
      return (
        <form key={idx} className="form seatfrm">
          <p class="text-capitalize text-center">Seat No:{seat}</p>
          <input
            className="form-control seatInp"
            onBlur={(e) => handlePassengerName(e, seat)}
            type="text"
            name="passenger-name"
            placeholder="Enter Name"
            autoComplete="off"
          />
        </form>
      );
    });
  };
  return (
    <div>
      <Header />
      <h2>Home Page</h2>
      <div className="ss">
        <div className="row spaceAround">
          <div className="column1">
            <div className="plane">
              <form onChange={(e) => getSeatNumber(e)}>
                <ol className="seats" type="A">
                  <li className="seat">
                    <input type="checkbox" value="1" id="1" />
                    <label htmlFor="1">1</label>
                  </li>
                  <li className="seat">
                    <input type="checkbox" id="2" value="2" />
                    <label htmlFor="2">2</label>
                  </li>
                  <li className="seat">
                    <input type="checkbox" value="3" id="3" />
                    <label htmlFor="3">3</label>
                  </li>
                  <li className="seat">
                    <input type="checkbox" value="4" id="4" />
                    <label htmlFor="4">4</label>
                  </li>
                  <li className="seat">
                    <input type="checkbox" id="5" value="5" />
                    <label htmlFor="5">5</label>
                  </li>
                  <li className="seat">
                    <input type="checkbox" value="6" id="6" />
                    <label htmlFor="6">6</label>
                  </li>
                  <li className="seat">
                    <input type="checkbox" value="7" id="7" />
                    <label htmlFor="7">7</label>
                  </li>
                  <li className="seat">
                    <input type="checkbox" id="8" value="8" />
                    <label htmlFor="8">8</label>
                  </li>
                </ol>
              </form>
            </div>
          </div>
          <div className="column2">
            <div className="seatInfo">
              <form className="form-group">
                {renderPassengerData(seatNumber)}
              </form>
              <div>
                <button
                  onClick={(e) => handleSubmitDetails(e)}
                  className="btn btn-info seatBT"
                >
                  Confirm Details
                </button>
              </div>
              <div className={arrowDown ? "activeArrow2" : "nonActive"}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
