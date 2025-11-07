import { useState, useEffect } from "react"
import "./styles/ProfilePage.css" 

function ProfilePage() {
  const userId = localStorage.getItem("userId")
  const [experiences, setExperiences] = useState(() => {
    const savedExperiences = localStorage.getItem(`experiences_${userId}`)
    return savedExperiences ? JSON.parse(savedExperiences) : []
  })

  const [form, setForm] = useState({
    company: "",
    title: "",
    years: "",
  })

  useEffect(() => {
    if (!userId) return

    const fetchExperiences = async () => {
      try {
        const res = await fetch(`/jobmatch/user/${userId}`)
        const data = await res.json()

        if (data.user?.user_experience) {
          const parsedExperiences =
            typeof data.user.user_experience === "string"
              ? JSON.parse(data.user.user_experience)
              : data.user.user_experience
          setExperiences(parsedExperiences)
          localStorage.setItem(
            `experiences_${userId}`,
            JSON.stringify(parsedExperiences)
          )
        }
      } catch (error) {
        console.error("Fel vid hämtning av erfarenheter:", error)
      }
    }

    fetchExperiences()
  }, [userId])

  useEffect(() => {
    if (!userId) return
    localStorage.setItem(`experiences_${userId}`, JSON.stringify(experiences))
  }, [experiences, userId])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const addExperience = async () => {
    if (!form.company || !form.title || !form.years) return
    const updatedExperiences = [...experiences, form]
    setExperiences(updatedExperiences)
    setForm({ company: "", title: "", years: "" })

    try {
      await fetch(`http://localhost:3000/jobmatch/user/experience/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_experience: updatedExperiences }),
      })
    } catch (error) {
      console.error("Kunde inte uppdatera erfarenheter i databasen:", error)
    }
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">Min Profil</h1>

      <div className="form-card">
        <h2 className="form-title">Lägg till Jobberfarenhet</h2>
        <div className="form-fields">
          <input
            name="company"
            placeholder="Företag"
            value={form.company}
            onChange={handleChange}
            className="input-field"
          />
          <input
            name="title"
            placeholder="Jobbtitel"
            value={form.title}
            onChange={handleChange}
            className="input-field"
          />
          <input
            name="years"
            placeholder="År (t.ex. 2020-2023)"
            value={form.years}
            onChange={handleChange}
            className="input-field"
          />
          <button onClick={addExperience} className="add-button">
            Lägg till
          </button>
        </div>
      </div>

      <div className="experience-section">
        <h3 className="section-title">Mina erfarenheter</h3>
        <div className="experience-list">
          {experiences.length === 0 ? (
            <p className="no-exp">Inga erfarenheter tillagda ännu.</p>
          ) : (
            experiences.map((exp, i) => (
              <div key={i} className="experience-card">
                <div className="exp-company">{exp.company}</div>
                <div className="exp-title">{exp.title}</div>
                <div className="exp-years">{exp.years}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
