import { useState } from "react";

export default function ProfilePage() {
  const [experiences, setExperiences] = useState([]);
  const [form, setForm] = useState({
    company: "",
    title: "",
    years: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addExperience = () => {
    if (!form.company || !form.title || !form.years) return;
    setExperiences([...experiences, form]);
    setForm({ company: "", title: "", years: "" });
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
