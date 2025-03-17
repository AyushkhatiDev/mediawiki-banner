import React, { useState } from "react";
import BannerPreview from "./components/BannerPreview";
import ControlForm, { BannerSettings } from "./components/ControlForm";
import { Container } from "react-bootstrap";

const App: React.FC = () => {
  const defaultSettings: BannerSettings = {
    text: "I Enjoy Exploring New Technologies", 
    background: "#1e3a8a",
    image: "",
    textColor: "#ffffff",
    height: 300,
    overlay: 50,
    fontSize: 48,
    fontWeight: "bold",
    textShadow: true,
    fontFamily: "'Arial', sans-serif",
    letterSpacing: 0,
    textTransform: "none",
    borderRadius: 0,
    animation: "none",
    textAlign: "center",
    backgroundPattern: false
  };

  const [settings, setSettings] = useState<BannerSettings>(defaultSettings);

  const handleChange = (newSettings: BannerSettings) => {
    setSettings(newSettings);
  };

  return (
    <div className="pb-4">
      <header className="bg-light py-3 mb-4 shadow-sm">
        <Container className="text-center">
          <h1 className="fs-2">Banner Generator</h1>
        </Container>
      </header>
      <BannerPreview settings={settings} />
      <ControlForm 
        onChange={handleChange} 
        initialSettings={defaultSettings}
      />
      <footer className="bg-dark text-white py-3 mt-4 text-center fixed-bottom">
        <Container>
          © {new Date().getFullYear()} Banner Generator - Professional Banner Creation Tool
        </Container>
      </footer>
    </div>
  );
};

export default App;