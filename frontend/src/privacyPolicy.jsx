import React from "react"

const mainContent = {
  display: "Flex",
  flexDirection: "column",
  margin: "3rem",
}

const p = {
  fontSize: "20px",
  margin: "2rem",
  marginTop: "0",
}

function PrivacyPolicy() {
  return (
    <>
      <h1>Intregritetspolicy</h1>
      <main style={mainContent}>
        <h2>Sparande av uppgifter</h2>
        <p style={p}>
          Vi behöver spara och behandla personuppgifter om dig, så som din mail
          adress, användarnamn,lösenord och dina meriter,(erfarenhet och
          utbilding). Syftet med en sådan behandling är för att kunna ge dig som
          användare ett enklet sätt att kunna få tillgång till dina sökta jobb
          på olika enhter och sätta upp en profil.
        </p>

        <h2>Vart kommer dina uppgitfter från?</h2>
        <p style={p}>
          Vi har fått dina uppgifter från användaren själv och dessa är
          nödvändiga för ingå avtalet för att använda våran tjänst. Vi tillämpar
          vid var tid gällande integritetslagstiftning vid all behandling av
          personuppgifter.
        </p>

        <h2>Rättsliga grunder</h2>
        <p style={p}>
          Den rättsliga grunden för att behandla dina personuppgifter är för
          avtalet som skrivs under om att få tillgång till våra tjänster. Dina
          uppgifter kommer att sparas så länge du har ett konto hos oss. De
          personuppgifter vi behandlar om dig delas med arbetgivare och företag
          som du själv har gjort till en ansökan till. Vi kommer aldrig att
          överföra dina uppgifter till ett land utanför Sverige
        </p>

        <h2>Personuppgiftansvarige: </h2>
        <p style={p}>
          Personuppgiftsansvarig är David, norsgatan 8B 472 73 Göteborg.{" "}
        </p>

        <h2>Rättigheter</h2>
        <p style={p}>
          Du har rätt att kontakta oss om du vill ha ut information om de
          uppgifter vi har om dig, för att begära rättelse, överföring eller för
          att begära att vi begränsar behandlingen, för att göra invändningar
          eller begära radering av dina uppgifter. Detta gör du enklast genom
          att kontakta oss på admin@jobmatch.se eller via telefon:
          035-024-53794. Du når vårt dataskyddsombud på
          dataskyddsombud@jobmatch.com. eller via 083-2113-02 Om du har klagomål
          på vår behandling av dina personuppgifter har du rätt att inge
          klagomål till tillsynsmyndigheten Integritetsskydsmyndigheten, IMY.
        </p>
      </main>
    </>
  )
}
export default PrivacyPolicy
