import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./styles/AccountSettings.css"

function AccountSettings() {
  const navigate = useNavigate()
  const userId = localStorage.getItem("userId")
  const [user, setUser] = useState(null)
  const [form, setForm] = useState({
    user_name: "",
    user_mail: "",
    user_password: "",
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/jobmatch/user/${userId}`)
        const data = await res.json()
        setUser(data.user)
        setForm({
          user_name: data.user.user_name || "",
          user_mail: data.user.user_mail || "",
          user_password: data.user.user_password || "",
        })
      } catch (error) {
        console.error("Kunde inte hämta användardata:", error)
      }
    }
    fetchUser()
  }, [userId])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleUpdate = async () => {
    try {
      const res = await fetch(`/jobmatch/user/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_name: form.user_name,
          user_mail: form.user_mail,
          user_password: form.user_password,
        }),
      })
      if (res.ok) {
        alert("Kontouppgifter uppdaterade!")
      } else {
        alert("Något gick fel vid uppdatering.")
      }
    } catch (error) {
      console.error("Kunde inte uppdatera konto:", error)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm("Är du säker på att du vill radera ditt konto?")) return
    try {
      const res = await fetch(`/jobmatch/user/${userId}`, {
        method: "DELETE",
      })
      if (res.ok) {
        alert("Ditt konto har raderats.")
        localStorage.clear()
        navigate("/")
      } else {
        alert("Kunde inte radera kontot.")
      }
    } catch (error) {
      console.error("Fel vid radering av konto:", error)
    }
  }

  if (!user) return <p>Laddar...</p>

  return (
    <div className="account-settings-container">
      <h1>Hej {user.user_name}</h1>

      <div className="account-form">
        <label>Namn</label>
        <input
          name="user_name"
          value={form.user_name}
          onChange={handleChange}
          className="input-field"
        />

        <label>E-post</label>
        <input
          name="user_mail"
          value={form.user_mail}
          type="email"
          onChange={handleChange}
          className="input-field"
        />

        <label>Lösenord</label>
        <input
          name="user_password"
          value={form.user_password}
          type="password"
          onChange={handleChange}
          className="input-field"
        />

        <button onClick={handleUpdate} className="save-button">
          Spara ändringar
        </button>

        <button onClick={handleDelete} className="delete-account-button">
          Radera konto
        </button>
      </div>
    </div>
  )
}

export default AccountSettings
