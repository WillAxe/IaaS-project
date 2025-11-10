import { useState, useEffect } from "react"
import "./styles/ProfilePage.css" 
import { Link } from "react-router-dom"


function ProfilePage() {
  const userId = localStorage.getItem("userId")

  const [editingExperienceIndex, setEditingExperienceIndex] = useState(null)
  const [editingEducationIndex, setEditingEducationIndex] = useState(null)
  
  const [experiences, setExperiences] = useState(() => {
    const savedExperiences = localStorage.getItem(`experiences_${userId}`)
    return savedExperiences ? JSON.parse(savedExperiences) : []
  })

  const[educations, setEducations] = useState(() => {
    const savedEducations = localStorage.getItem(`educations_${userId}`)
    return savedEducations ? JSON.parse(savedEducations) : []
  })

  const [formExperience, setFormExperience] = useState({
    company: "",
    title: "",
    years: "",
  })

  const [formEducation, setFormEducation] = useState({
    school: "",
    degree: "",
    years: "",
  })

  useEffect(() => {
    if (!userId) return

    const fetchUserData = async () => {
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
        
        if (data.user?.user_education) {
          const parsedEducations =
          typeof data.user.user_education === "string"
          ? JSON.parse(data.user.user_education)
          : data.user.user_education
          setEducations(parsedEducations)
          localStorage.setItem(
            `educations_${userId}`,
            JSON.stringify(parsedEducations)
          )
        }
      } catch (error) {
        console.error("Fel vid hämtning av erfarenheter:", error)
      }
    }

    fetchUserData()
  }, [userId])

  useEffect(() => {
    if (!userId) return
    localStorage.setItem(`experiences_${userId}`, JSON.stringify(experiences))
  }, [experiences, userId])

  const handleExperienceChange = (e) => {
    setFormExperience({ ...formExperience, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (!userId) return
    localStorage.setItem(`educations_${userId}`, JSON.stringify(educations))
  }, [educations, userId])

  const handleEducationChange = (e) => {
    setFormEducation({ ...formEducation, [e.target.name]: e.target.value })
  }

  const addExperience = async () => {
  if (!formExperience.company || !formExperience.title || !formExperience.years) return

  let updatedExperiences

  
  if (editingExperienceIndex !== null) {
    updatedExperiences = experiences.map((exp, i) =>
      i === editingExperienceIndex ? formExperience : exp
    )
    setEditingExperienceIndex(null)
  } else {
    updatedExperiences = [...experiences, formExperience]
  }

  setExperiences(updatedExperiences)
  setFormExperience({ company: "", title: "", years: "" })

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


  const addEducation = async () => {
  if (!formEducation.school || !formEducation.degree || !formEducation.years) return

  let updatedEducations

  if (editingEducationIndex !== null) {
    updatedEducations = educations.map((edu, i) =>
      i === editingEducationIndex ? formEducation : edu
    )
    setEditingEducationIndex(null)
  } else {
    updatedEducations = [...educations, formEducation]
  }

  setEducations(updatedEducations)
  setFormEducation({ school: "", degree: "", years: "" })

  try {
    await fetch(`http://localhost:3000/jobmatch/user/education/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_education: updatedEducations }),
    })
  } catch (error) {
    console.error("Kunde inte uppdatera utbildningar i databasen:", error)
  }
}

  
const deleteExperience = async (index) => {
  const updatedExperiences = experiences.filter((_, i) => i !== index)
  setExperiences(updatedExperiences)
  localStorage.setItem(`experiences_${userId}`, JSON.stringify(updatedExperiences))

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


const deleteEducation = async (index) => {
  const updatedEducations = educations.filter((_, i) => i !== index)
  setEducations(updatedEducations)
  localStorage.setItem(`educations_${userId}`, JSON.stringify(updatedEducations))

  try {
    await fetch(`http://localhost:3000/jobmatch/user/education/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_education: updatedEducations }),
    })
  } catch (error) {
    console.error("Kunde inte uppdatera utbildningar i databasen:", error)
  }
}


  return (
    <div className="profile-container">
      <div>
        <Link to="/account-settings" className="manage-account-button">
        Hantera konto
        </Link>
        </div>
      <h1 className="profile-title">Min Profil</h1>
      <div className="form-card">
        <h2 className="form-title">Lägg till Jobberfarenhet</h2>
        <div className="form-fields">
          <input
            name="company"
            placeholder="Företag"
            value={formExperience.company}
            onChange={handleExperienceChange}
            className="input-field"
          />
          <input
            name="title"
            placeholder="Jobbtitel"
            value={formExperience.title}
            onChange={handleExperienceChange}
            className="input-field"
          />
          <input
            name="years"
            placeholder="År (t.ex. 2020–2023)"
            value={formExperience.years}
            onChange={handleExperienceChange}
            className="input-field"
          />
          <button onClick={addExperience} className="add-button">
            {editingExperienceIndex !== null ? "Uppdatera Erfarenhet" : "Lägg till Erfarenhet"}
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
                <div className="button-row">
                <button
                  onClick={() => deleteExperience(i)}
                  className="delete-button"
                >Ta bort</button>
                <button onClick={()=>{
                  setFormExperience(exp)
                  setEditingExperienceIndex(i)
                }}className="edit-button">Redigera</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      
      <div className="form-card">
        <h2 className="form-title">Lägg till Utbildning</h2>
        <div className="form-fields">
          <input
            name="school"
            placeholder="Skola / Universitet"
            value={formEducation.school}
            onChange={handleEducationChange}
            className="input-field"
          />
          <input
            name="degree"
            placeholder="Examen / Program"
            value={formEducation.degree}
            onChange={handleEducationChange}
            className="input-field"
          />
          <input
            name="years"
            placeholder="År (t.ex. 2018–2021)"
            value={formEducation.years}
            onChange={handleEducationChange}
            className="input-field"
          />
          <button onClick={addEducation} className="add-button">
            {editingEducationIndex !== null ? "Uppdatera" : "Lägg till Utbildning"}
          </button>
        </div>
      </div>

      <div className="experience-section">
        <h3 className="section-title">Mina utbildning</h3>
        <div className="experience-list">
          {educations.length === 0 ? (
            <p className="no-exp">Ingen utbildning tillagd ännu.</p>
          ) : (
            educations.map((edu, i) => (
              <div key={i} className="experience-card">
                <div className="exp-company">{edu.school}</div>
                <div className="exp-title">{edu.degree}</div>
                <div className="exp-years">{edu.years}</div>
                <div className="button-row">
                <button
                  onClick={() => deleteEducation(i)}
                  className="delete-button"
                >Ta bort</button> 
                <button onClick={()=>{
                  setFormEducation(edu)
                  setEditingEducationIndex(i)
                }} className="edit-button">Redigera</button>
                </div>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
