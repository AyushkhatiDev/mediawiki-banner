
import React from "react";
import { Form } from "react-bootstrap";
import { BannerSettings } from "./ControlForm";

interface ThemeSelectorProps {
  onThemeChange: (settings: Partial<BannerSettings>) => void;
}

const themes = {
  light: {
    background: "#ffffff",
    textColor: "#000000",
    textShadow: false,
    backgroundPattern: true
  },
  dark: {
    background: "#1e3a8a",
    textColor: "#ffffff",
    textShadow: true,
    backgroundPattern: false
  },
  custom: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    textColor: "#ffffff",
    textShadow: true,
    backgroundPattern: false
  }
};

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ onThemeChange }) => {
  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = themes[e.target.value as keyof typeof themes];
    onThemeChange(selectedTheme);
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>Select Theme</Form.Label>
      <Form.Select onChange={handleThemeChange}>
        <option value="light">Light Theme</option>
        <option value="dark">Dark Theme</option>
        <option value="custom">Custom Gradient</option>
      </Form.Select>
    </Form.Group>
  );
};

export default ThemeSelector;