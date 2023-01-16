import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import "../App.css";
import Taskbar from "../components/taskbar";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const checkInput = (event) => {
    if(name === undefined || email === undefined || password === undefined){
      alert("Please enter the Name, Email and Password !");
    }
    else {
      registerUser(event);
    }
  }

  async function registerUser(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:1337/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();
    if (data.status === "ok") {
      navigate("/login");
    }
  }

  return (
    <div className="outerBox">
      <div className="glassDesign box">
        <Header />
        <Taskbar />
        <div>
          <form onSubmit={checkInput} className="flexColumn">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <input type="submit" value="Register" className="glassDesign" style={{marginTop: "1%"}}/>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
