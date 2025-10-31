import React from "react"
import { useState, useEffect } from "react"

function createAccount() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)

    try {
      const response = await fetch("/jobmatch/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        alert("Konto skapat!")
        setFormData({ name: "", email: "", password: "" })
      } else {
        alert("Något gick fel vid skapandet av kontot.")
      }
    } catch (error) {
      console.error("Fel:", error)
      alert("Serverfel.")
    }
  }
  return (
    <>
      <h2>Skapa ditt konto</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Namn:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            E-Post:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Lösenord:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <div>
            <button type="submit">Skapa konto</button>
          </div>
        </form>
      </div>
    </>
  )
}
export default createAccount
