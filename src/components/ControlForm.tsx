import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Container, Row, Col, Card, Tabs, Tab, Badge, Modal, InputGroup } from "react-bootstrap";
import ThemeSelector from "./ThemeSelector";

export interface BannerSettings {
  text: string;
  background: string;
  image: string;
  textColor: string;
  height: number;
  overlay: number;
  fontSize: number;
  fontWeight: string;
  textShadow: boolean;
  fontFamily: string;
  letterSpacing: number;
  textTransform: string;
  borderRadius: number;
  animation: string;
  textAlign: "left" | "center" | "right";
  backgroundPattern: boolean;
}

interface ControlFormProps {
  onChange: (settings: BannerSettings) => void;
  initialSettings: BannerSettings;
}

interface PresetTemplate {
  name: string;
  settings: Partial<BannerSettings>;
  thumbnail?: string;
}

const ControlForm: React.FC<ControlFormProps> = ({ onChange, initialSettings }) => {
  const [settings, setSettings] = useState<BannerSettings>(initialSettings);
  const [isDirty, setIsDirty] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [showPresetModal, setShowPresetModal] = useState(false);
  const [presetName, setPresetName] = useState("");
  const [savedPresets, setSavedPresets] = useState<PresetTemplate[]>([
    {
      name: "Corporate Blue",
      settings: {
        background: "#003366",
        textColor: "#ffffff",
        fontFamily: "'Arial', sans-serif",
        fontSize: 52,
        fontWeight: "bold",
        textShadow: true,
        animation: "fade",
        textAlign: "center",
        backgroundPattern: false
      },
      thumbnail: "https://via.placeholder.com/100x60/003366/ffffff?text=Corporate"
    },
    {
      name: "Modern Gradient",
      settings: {
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        textColor: "#ffffff",
        fontFamily: "'Segoe UI', sans-serif",
        fontSize: 46,
        letterSpacing: 2,
        textTransform: "uppercase",
        borderRadius: 8,
        animation: "slide",
        textAlign: "center",
        backgroundPattern: false
      },
      thumbnail: "https://via.placeholder.com/100x60/667eea/ffffff?text=Modern"
    },
    {
      name: "Elegant Minimal",
      settings: {
        background: "#f8f9fa",
        textColor: "#212529",
        fontFamily: "'Georgia', serif",
        fontSize: 44,
        fontWeight: "normal",
        letterSpacing: 1,
        textShadow: false,
        borderRadius: 0,
        animation: "none",
        textAlign: "center",
        backgroundPattern: false
      },
      thumbnail: "https://via.placeholder.com/100x60/f8f9fa/212529?text=Elegant"
    }
  ]);

  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSettings(initialSettings);
  }, [initialSettings]);

  const updateSettings = (newSettings: Partial<BannerSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    setIsDirty(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChange(settings);
    setIsDirty(false);
  };

  const handleReset = () => {
    setSettings(initialSettings);
    setIsDirty(false);
  };

  const handleTabChange = (key: string | null) => {
    if (key) setActiveTab(key);
  };

  const handlePresetSave = () => {
    if (!presetName.trim()) return;
    
    const newPreset: PresetTemplate = {
      name: presetName,
      settings: { ...settings },
      thumbnail: settings.image || `https://via.placeholder.com/100x60/${settings.background.replace('#', '')}/ffffff?text=Preset`
    };
    
    setSavedPresets([...savedPresets, newPreset]);
    setShowPresetModal(false);
    setPresetName("");
  };

  const applyPreset = (preset: PresetTemplate) => {
    updateSettings({ ...settings, ...preset.settings });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateSettings({ image: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container className="my-4">
      <Card className="shadow-sm">
        <Card.Header className="bg-white py-3">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <h2 className="mb-0 fs-4">Banner Designer</h2>
            <div className="d-flex gap-2">
              <Badge 
                bg={isDirty ? "warning" : "success"} 
                className="d-flex align-items-center py-2 px-3"
              >
                {isDirty ? "Unsaved Changes" : "Saved"}
              </Badge>
              <Button 
                variant="outline-secondary" 
                size="sm" 
                onClick={() => setShowPresetModal(true)}
              >
                Save Preset
              </Button>
            </div>
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          <Tabs
            activeKey={activeTab}
            onSelect={handleTabChange}
            className="mb-3 px-3 pt-3"
            justify
          >
            <Tab eventKey="basic" title="Basic Settings">
              <Form onSubmit={handleSubmit} className="px-3 pb-3">
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Banner Text</Form.Label>
                      <Form.Control
                        type="text"
                        value={settings.text}
                        onChange={(e) => updateSettings({ text: e.target.value })}
                        placeholder="Enter banner text"
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Background</Form.Label>
                      <div className="d-flex">
                        <Form.Control
                          type="color"
                          value={settings.background.startsWith('#') ? settings.background : '#ffffff'}
                          onChange={(e) => updateSettings({ background: e.target.value })}
                          className="me-2"
                          style={{ width: "60px" }}
                        />
                        <Form.Control
                          type="text"
                          value={settings.background}
                          onChange={(e) => updateSettings({ background: e.target.value })}
                          placeholder="Color or gradient"
                        />
                      </div>
                      <Form.Text className="text-muted">
                        You can use hex colors or CSS gradients
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Background Image</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="text"
                          value={settings.image}
                          onChange={(e) => updateSettings({ image: e.target.value })}
                          placeholder="Enter image URL"
                        />
                        <Button 
                          variant="outline-secondary"
                          onClick={() => imageInputRef.current?.click()}
                        >
                          Upload
                        </Button>
                        <input
                          ref={imageInputRef}
                          type="file"
                          accept="image/*"
                          className="d-none"
                          onChange={handleImageUpload}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Text Color</Form.Label>
                      <div className="d-flex">
                        <Form.Control
                          type="color"
                          value={settings.textColor}
                          onChange={(e) => updateSettings({ textColor: e.target.value })}
                          className="me-2"
                          style={{ width: "60px" }}
                        />
                        <Form.Control
                          type="text"
                          value={settings.textColor}
                          onChange={(e) => updateSettings({ textColor: e.target.value })}
                        />
                      </div>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <ThemeSelector onThemeChange={updateSettings} />
                  </Col>
                </Row>
              </Form>
            </Tab>
            
            <Tab eventKey="typography" title="Typography">
              <Form onSubmit={handleSubmit} className="px-3 pb-3">
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Font Size: {settings.fontSize}px</Form.Label>
                      <Form.Range
                        min="20"
                        max="100"
                        value={settings.fontSize}
                        onChange={(e) => updateSettings({ fontSize: parseInt(e.target.value) })}
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Font Weight</Form.Label>
                      <Form.Select
                        value={settings.fontWeight}
                        onChange={(e) => updateSettings({ fontWeight: e.target.value })}
                      >
                        <option value="normal">Normal</option>
                        <option value="bold">Bold</option>
                        <option value="300">Light</option>
                        <option value="600">Semi-Bold</option>
                        <option value="800">Extra Bold</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Font Family</Form.Label>
                      <Form.Select
                        value={settings.fontFamily}
                        onChange={(e) => updateSettings({ fontFamily: e.target.value })}
                      >
                        <option value="'Arial', sans-serif">Arial</option>
                        <option value="'Helvetica', sans-serif">Helvetica</option>
                        <option value="'Georgia', serif">Georgia</option>
                        <option value="'Times New Roman', serif">Times New Roman</option>
                        <option value="'Verdana', sans-serif">Verdana</option>
                        <option value="'Roboto', sans-serif">Roboto</option>
                        <option value="'Open Sans', sans-serif">Open Sans</option>
                        <option value="'Montserrat', sans-serif">Montserrat</option>
                        <option value="monospace">Monospace</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Letter Spacing: {settings.letterSpacing}px</Form.Label>
                      <Form.Range
                        min="0"
                        max="10"
                        step="0.5"
                        value={settings.letterSpacing}
                        onChange={(e) => updateSettings({ letterSpacing: parseFloat(e.target.value) })}
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Text Transform</Form.Label>
                      <Form.Select
                        value={settings.textTransform}
                        onChange={(e) => updateSettings({ textTransform: e.target.value })}
                      >
                        <option value="none">None</option>
                        <option value="uppercase">UPPERCASE</option>
                        <option value="lowercase">lowercase</option>
                        <option value="capitalize">Capitalize</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="text-shadow-switch"
                        label="Text Shadow"
                        checked={settings.textShadow}
                        onChange={(e) => updateSettings({ textShadow: e.target.checked })}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Tab>
            
            <Tab eventKey="layout" title="Layout & Effects">
              <Form onSubmit={handleSubmit} className="px-3 pb-3">
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Banner Height: {settings.height}px</Form.Label>
                      <Form.Range
                        min="100"
                        max="600"
                        value={settings.height}
                        onChange={(e) => updateSettings({ height: parseInt(e.target.value) })}
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Background Overlay: {settings.overlay}%</Form.Label>
                      <Form.Range
                        min="0"
                        max="100"
                        value={settings.overlay}
                        onChange={(e) => updateSettings({ overlay: parseInt(e.target.value) })}
                      />
                      <Form.Text className="text-muted">
                        Adds a dark overlay to make text more readable over images
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Border Radius: {settings.borderRadius}px</Form.Label>
                      <Form.Range
                        min="0"
                        max="50"
                        value={settings.borderRadius}
                        onChange={(e) => updateSettings({ borderRadius: parseInt(e.target.value) })}
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Animation</Form.Label>
                      <Form.Select
                        value={settings.animation}
                        onChange={(e) => updateSettings({ animation: e.target.value })}
                      >
                        <option value="none">None</option>
                        <option value="fade">Fade In</option>
                        <option value="slide">Slide In</option>
                        <option value="bounce">Bounce</option>
                        <option value="pulse">Pulse</option>
                        <option value="rotate">Rotate In</option>
                        <option value="flip">Flip In</option>
                        <option value="shake">Shake</option>
                        <option value="swing">Swing</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Text Alignment</Form.Label>
                      <Form.Select
                        value={settings.textAlign}
                        onChange={(e) => updateSettings({ textAlign: e.target.value as "left" | "center" | "right" })}
                      >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="background-pattern-switch"
                        label="Background Pattern"
                        checked={settings.backgroundPattern}
                        onChange={(e) => updateSettings({ backgroundPattern: e.target.checked })}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Tab>
            
            <Tab eventKey="presets" title="Presets">
              <div className="px-3 pb-3">
                <Row xs={1} md={2} lg={3} className="g-3">
                  {savedPresets.map((preset, index) => (
                    <Col key={index}>
                      <Card className="h-100">
                        <Card.Img 
                          variant="top" 
                          src={preset.thumbnail} 
                          style={{ height: '60px', objectFit: 'cover' }}
                        />
                        <Card.Body className="d-flex flex-column">
                          <Card.Title>{preset.name}</Card.Title>
                          <div className="mt-auto">
                            <Button 
                              variant="primary" 
                              size="sm" 
                              className="w-100"
                              onClick={() => applyPreset(preset)}
                            >
                              Apply Preset
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            </Tab>
          </Tabs>
        </Card.Body>
        <Card.Footer className="bg-white py-3">
          <div className="d-flex justify-content-end gap-2">
            <Button 
              variant="outline-secondary" 
              onClick={handleReset}
              disabled={!isDirty}
            >
              Reset
            </Button>
            <Button 
              variant="primary" 
              type="submit"
              onClick={handleSubmit}
              disabled={!isDirty}
            >
              Apply Changes
            </Button>
          </div>
        </Card.Footer>
      </Card>
      
      {/* Preset Modal */}
      <Modal show={showPresetModal} onHide={() => setShowPresetModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Save Preset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Preset Name</Form.Label>
            <Form.Control
              type="text"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              placeholder="Enter a name for your preset"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPresetModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handlePresetSave}>
            Save Preset
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ControlForm;