import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import UploadModelPage from "./pages/UploadModelPage";
import ViewModelPage from "./pages/ViewModelPage";
import "bootstrap/dist/css/bootstrap.min.css";

const appContainerStyle = {
  height: "100vh",
  width: "100vw",
  background: "linear-gradient(135deg, #232526 0%, #5b86e5 100%)",
  fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif",
  overflow: "hidden",
};

const cardStyle = {
  background: "rgba(34, 40, 49, 0.97)",
  borderRadius: "24px",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.25)",
  padding: "40px 48px",
  minWidth: "340px",
  color: "#fff",
  textAlign: "center",
  border: "1px solid rgba(255,255,255,0.08)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const headingStyle = {
  fontSize: "2.5rem",
  fontWeight: 700,
  marginBottom: "24px",
  letterSpacing: "0.05em",
  color: "#f8fafc",
};

const linkStyle = {
  display: "inline-block",
  margin: "12px 0",
  padding: "12px 32px",
  background: "linear-gradient(90deg, #36d1c4 0%, #5b86e5 100%)",
  color: "#fff",
  borderRadius: "12px",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: "1.1rem",
  transition: "background 0.2s, transform 0.2s",
  boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
};

const linkHoverStyle = {
  background: "linear-gradient(90deg, #5b86e5 0%, #36d1c4 100%)",
  transform: "translateY(-2px) scale(1.03)",
};

const Home = () => {
  const [hovered, setHovered] = React.useState(null);

  return (
    <div style={cardStyle} className="mx-auto my-5">
      <h2 style={headingStyle}>Welcome to the 3D Model Viewer</h2>
      <p>Choose an action:</p>
      <ul className="list-unstyled mt-4 mb-0">
        <li>
          <Link
            to={"/upload"}
            style={
              hovered === 0 ? { ...linkStyle, ...linkHoverStyle } : linkStyle
            }
            onMouseEnter={() => setHovered(0)}
            onMouseLeave={() => setHovered(null)}
          >
            Upload a Model
          </Link>
        </li>
        <li>
          <Link
            to={"/view"}
            style={
              hovered === 1 ? { ...linkStyle, ...linkHoverStyle } : linkStyle
            }
            onMouseEnter={() => setHovered(1)}
            onMouseLeave={() => setHovered(null)}
          >
            View Models
          </Link>
        </li>
      </ul>
    </div>
  );
};

const App = () => {
  return (
    <div
      style={appContainerStyle}
      className="d-flex flex-column align-items-center justify-content-center"
    >
      <h1 style={headingStyle} className="mb-4">
        3D Model Viewer
      </h1>
      <Routes>
        <Route path="/upload" element={<UploadModelPage />} />
        <Route path="/view" element={<ViewModelPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
