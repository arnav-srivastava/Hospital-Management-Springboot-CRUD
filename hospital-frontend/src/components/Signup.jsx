import React, { useState } from "react";

export default function Signup({ onSignupSuccess, goToLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
 if (!username || !email || !password) {
      alert("Please fill in all fields before signing up.");
      return;
    }

    const res = await fetch("http://localhost:8080/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const msg = await res.text();
    alert(msg);
    if (res.ok) {
      onSignupSuccess();
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <input
        placeholder="Username"
        required
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Email"
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>

      <p style={{ marginTop: "10px" }}>
        Already have an account?{" "}
        <button
          onClick={goToLogin}
          style={{
            background: "none",
            border: "none",
            color: "#007bff",
            cursor: "pointer",
            textDecoration: "underline",
            padding: 0
          }}
        >
          Login here
        </button>
      </p>
    </div>
  );
}
