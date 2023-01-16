import { useState } from "react";
import Header from "../components/header";
// import {useNavigate} from 'react-router-dom';
import "../App.css";
import Taskbar from "../components/taskbar";

function Login() {
  // const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const checkInput = (event) => {
    if(email === undefined || password === undefined){
      alert("Please enter the Email and Password !");
    }
    else {
      loginUser(event);
    }
  }

  async function loginUser(event) {
    event.preventDefault();
    
    const response = await fetch("http://localhost:1337/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    // console.log(data.token);

    if (data) {
      // localStorage.setItem("token", (data.token, new Date().getTime()));
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "tokenData",
        JSON.stringify({
          ...data.token,
          issuedAt: new Date().getTime(),
        })
      );
      alert("Login successful!");
      //why did the navigate hook did not work here ??
      window.location.href = "/homepage";
    } else {
      alert("Please check your email and password!");
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
            <input type="submit" value="Login" className="glassDesign" style={{marginTop: "1%"}}/>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
