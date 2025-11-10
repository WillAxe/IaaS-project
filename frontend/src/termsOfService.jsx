import React from "react"

const title = {
  FontSize: "20px",
}

const listStyle = {
  display: "Flex",
  flexDirection: "Column",
}

const liStyle = {
  margin: "28px",
  padding: "12px",
  fontSize: "18px",
}

function TermsOfService() {
  return (
    <>
      <h1 style={title}>Användarvillkor</h1>
      <ul style={listStyle}>
        <li style={liStyle}>
          Våran tjänst erbjuder ett verktyg för att kunna filtera och söka de
          jobb som bäst passar dina meriter. Vi förbehåller oss rätten att när
          som helst ändra tjänsten.
        </li>
        <li style={liStyle}>
          För att använda våran tjänst behöver du skapa ett konto och du
          ansvarar då för korrekta uppgifter vid registerting. Hålla dina
          inloggingsuppgifter hemliga och omdelbart kontakta oss om du
          misstänker obhörig åtkomst till ditt konto.Vi förbehåller oss rätten
          att avsluta eller begränsa konton som bryter mot dessa villkor.
        </li>
        <li style={liStyle}>
          Allt innehåll på webbplatsen, inklusive texter, bilder, logotyper och
          programkod, ägs av JobMatch eller våra licensgivare. Du får inte
          kopiera, sprida eller använda materialet utan vårt skriftliga
          medgivande.
        </li>
        <li style={liStyle}>
          Du kan när som helst avsluta ditt konto genom att kontakta oss. Vi kan
          avsluta din tillgång till tjänsten om du bryter mot villkoren eller
          använder tjänsten på ett sätt som är olagligt eller skadligt.
        </li>
      </ul>
    </>
  )
}

export default TermsOfService
