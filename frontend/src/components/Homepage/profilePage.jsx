import { useState, useEffect } from "react";

function ProfilePage() {
  const userId = localStorage.getItem("userId");
   const [experiences, setExperiences] = useState(() => {
    const savedExperiences = localStorage.getItem("experiences");
    return savedExperiences ? JSON.parse(savedExperiences): []
  });
  
  const [form, setForm] = useState({
    company: "",
    title: "",
    years: "",
  });

  
  
  useEffect(() => {
    if (!userId) return; 

    const fetchExperiences = async () => {
      try {
        const res = await fetch(`/jobmatch/user/${userId}`);
        const data = await res.json();

        if (data.user?.user_experience) {
          setExperiences(data.user.user_experience); 
          localStorage.setItem("experiences", JSON.stringify(data.user.user_experience));
        }
      } catch (error) {
        console.error("Fel vid hämtning av erfarenheter:", error);
      }
    };

    fetchExperiences();
  }, [userId]);

  // useEffect(() => {
  //   const savedExperiences = localStorage.getItem("experiences");
  //   if (savedExperiences) {
  //     setExperiences(JSON.parse(savedExperiences));
  //   };
  // }, []);

  useEffect(() => {
    localStorage.setItem("experiences", JSON.stringify(experiences));
  }, [experiences]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addExperience = async() => {
    if (!form.company || !form.title || !form.years) return;
     const updatedExperiences = [...experiences, form];
     setExperiences(updatedExperiences);
     setForm({ company: "", title: "", years: "" });

    try {
      await fetch(`http://localhost:3000/jobmatch/user/experience/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_experience: updatedExperiences }),
      });
    } catch (error) {
      console.error("Kunde inte uppdatera erfarenheter i databasen:", error);
    }
  };

  

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "Arial" }}>
      <h1>Min Profil</h1>
      <h2>Lägg till Jobberfarenhet</h2>

      <div style={{ marginBottom: "1rem" }}>
        <input
          name="company"
          placeholder="Företag"
          value={form.company}
          onChange={handleChange}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          name="title"
          placeholder="Jobbtitel"
          value={form.title}
          onChange={handleChange}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          name="years"
          placeholder="År (t.ex. 2020-2023)"
          value={form.years}
          onChange={handleChange}
          style={{ marginRight: "0.5rem" }}
        />
        <button onClick={addExperience}>Lägg till</button>
      </div>

      <h3>Mina erfarenheter</h3>
      <ul>
        {experiences.map((exp, i) => (
          <li key={i}>
            <strong>{exp.company}</strong> – {exp.title} ({exp.years})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfilePage;