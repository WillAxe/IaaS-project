import React from "react"
import { useState, _useEffect } from "react"
import { useNavigate } from "react-router-dom"

function CreateAccount() {
  const navigate = useNavigate()
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
      // map frontend form keys to backend expected keys
      const payload = {
        user_name: formData.name,
        user_mail: formData.email,
        user_password: formData.password,
      }

      const response = await fetch("/jobmatch/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
      if (response.ok) {
        setFormData({ name: "", email: "", password: "" })
        navigate("/homePage")
      } else {
        // show server response message when available
        let msg = "Något gick fel vid skapandet av kontot."
        try {
          const body = await response.json()
          if (body && body.error) msg = body.error
        } catch {
          msg
        }
        alert(msg)
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
export default CreateAccount
