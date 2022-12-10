import { useState } from "react";
import Header from "../components/header";
// import {useNavigate} from 'react-router-dom';
import "../App.css";

function Login() {
  // const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

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
    console.log(data);

    if (data.user) {
      localStorage.setItem("token", data.user);
      alert("Login successful!");
      //why did the navigate hook did not work here ??
      window.location.href = "/dashboard";
    } else {
      alert("Please check your email and password!");
    }
  }

  return (
    <div>
      <Header />
      <div>
        <h1>Login</h1>
        <form onSubmit={loginUser}>
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
          <input type="submit" value="Register" />
        </form>
      </div>
    </div>
  );
}

export default Login;
