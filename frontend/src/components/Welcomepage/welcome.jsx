import React, { useState } from "react";
import "./createAccount.jsx";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/jobmatch/users/:id", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Fel inloggningsuppgifter");
      }

      const data = await response.json();
      alert(`Välkommen, ${data.user?.name || "användare"}!`);
    } catch (error) {
      alert("Inloggning misslyckades. Kontrollera dina uppgifter.");
      console.error("Login error:", error);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        margin: 0,
        width: "100vw",                
        background: "linear-gradient(135deg, #2563eb, #60a5fa)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        padding: "2rem",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          color: "#333",
          borderRadius: "12px",
          padding: "3rem",
          width: "100%",               
          maxWidth: "500px",            
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h1
          style={{
            color: "#2563eb",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
           Välkommen till JobMatch
        </h1>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <div>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}
            >
              E-post
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                fontSize: "1rem",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}
            >
              Lösenord
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                fontSize: "1rem",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "12px",
              backgroundColor: "#2563eb",
              color: "white",
              fontWeight: 600,
              border: "none",
              borderRadius: "6px",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
          >
            Logga in
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            fontSize: "0.9rem",
          }}
        >
          Har du inget konto?{" "}
          <a href="./createAccount" style={{ color: "#2563eb", fontWeight: 600 }}>
            Registrera dig här
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
