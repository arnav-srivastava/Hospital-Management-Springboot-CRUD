import React, { useState } from "react";

export default function Login({ setToken, onSignupClick }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
      if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    } 
    
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.text();
    if (res.ok) {
      localStorage.setItem("token", data);
      setToken(data);
    } else {
      alert(data);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input placeholder="Username" required onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? <button onClick={onSignupClick}>Sign up</button>
      </p>
    </div>
  );
}
