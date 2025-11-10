import React from "react"
import { useState, _useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

function CreateAccount() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    checkbox: false,
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

      const response = await fetch("http://localhost:3000/jobmatch/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
      if (response.ok) {
        const data = await response.json()
        console.log(data.user_id)
        let userId = data.user_id
        setFormData({ name: "", email: "", password: "" })
        navigate(`/homePage/${userId}`)
      } else {
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
            <label>
              <input
                type="checkbox"
                name="checkbox"
                checked={formData.checkbox}
                onChange={(e) =>
                  setFormData({ ...formData, checkbox: e.target.checked })
                }
                required
              />
              Jag godkänner{" "}
              <Link to="/privacy-policy" target="_blank">
                intergritetspolicyn
              </Link>{" "}
              och{" "}
              <Link to="/terms-of-service" target="_blank">
                Användarvillkoren
              </Link>
            </label>
          </div>
          <div>
            <button type="submit">Skapa konto</button>
          </div>
        </form>
      </div>
    </>
  )
}
export default CreateAccount
