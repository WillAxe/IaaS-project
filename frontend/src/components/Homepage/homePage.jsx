import { Link } from "react-router-dom";

function HomePage() {
 
  const navbarStyle = {
    backgroundColor: "lightblue",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    padding: "12px 24px",
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1000px",
    margin: "0 auto",
  };

  const logoStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#2563eb",
    textDecoration: "none",
  };

  const linksContainer = {
    display: "flex",
    gap: "24px",
  };

  const linkStyle = {
    color: "#333",
    textDecoration: "none",
    fontWeight: "500",
  };

  return (
    <div>
      {/* Navbar */}
      <nav style={navbarStyle}>
        <div style={containerStyle}>
          <Link
            to="/homePage/:userid"
            style={logoStyle}
            onMouseOver={(e) => (e.target.style.color = "#1e40af")}
            onMouseOut={(e) => (e.target.style.color = "#2563eb")}
          >
            JobMatch
          </Link>
          <div style={linksContainer}>
            <Link
              to="/profilePage"
              style={linkStyle}
              onMouseOver={(e) => (e.target.style.color = "#2563eb")}
              onMouseOut={(e) => (e.target.style.color = "#333")}
            >
              Profil
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default HomePage;
