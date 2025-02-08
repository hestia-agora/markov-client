import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Tabs, Tab } from "react-bootstrap";
import "./modal.css"; 

const ModalForm = ({ show, handleClose, onSubmit }) => {
  const [key, setKey] = useState("transition");
  const [selectedGender, setSelectedGender] = useState("man"); // Default gender selection

  // Default parameters for men and women
  const defaultParameters = {
    man: {
      tpDn: 0.08, tpDRU: 0.15, tpDU: 0.23, tpDFO: 0.23, tpDTS: 0.23,
      tpIU_RU: 0.0, tpIU_U: 0.0, tpIU_FO: 0.0, tpIU_TS: 0.0,
      tpRU_IU: 0.05, tpRU_U: 0.0, tpU_RU: 0.10, tpU_FO: 0.00, tpU_TS: 0.00,
      tpFO_RU: 0.03, tpFO_U: 0.05, tpFO_TS: 0.01, tpTS_U: 0.30, tpTS_FO: 0.15
    },
    woman: {
      tpDn: 0.08, tpDRU: 0.15, tpDU: 0.23, tpDFO: 0.23, tpDTS: 0.40, // tpDTS will be recalculated dynamically
      tpIU_RU: 0.0, tpIU_U: 0.0, tpIU_FO: 0.0, tpIU_TS: 0.0,
      tpRU_IU: 0.05, tpRU_U: 0.0, tpU_RU: 0.10, tpU_FO: 0.00, tpU_TS: 0.00,
      tpFO_RU: 0.04, tpFO_U: 0.07, tpFO_TS: 0.01, tpTS_U: 0.30, tpTS_FO: 0.15
    }
  };

  const defaultCosts = {
    man: { cIU: 0, cRU: 0, cU: 130240, cFO: 273600, cTS: 550000, cDeath: 0, cDr: 0.03 },
    woman: { cIU: 0, cRU: 0, cU: 130240, cFO: 273600, cTS: 550000, cDeath: 0, cDr: 0.03 }
  };

  // Initialize state based on gender
  const [parameters, setParameters] = useState(defaultParameters[selectedGender]);
  const [costs, setCosts] = useState(defaultCosts[selectedGender]);

  const descriptions = {
    tpDn: "Sannolikhet för död vid ingen undernäring.",
    tpDRU: "Sannolikhet för död vid risk för undernäring.",
    tpDU: "Sannolikhet för död vid undernäring.",
    tpDFO: "Sannolikhet för död efter en fallolycka.",
    tpDTS: "Ökad sannolikhet för död på grund av trycksår.",
    cIU: "Kostnad för ingen undernäring.",
    cRU: "Kostnad för risk för undernäring.",
    cU: "Kostnad för vård vid undernäring.",
    cFO: "Kostnad för fallolycka.",
    cTS: "Kostnad för trycksår.",
    cDeath: "Kostnad för dödsfall.",
    cDr: "Diskonteringsränta för kostnader (3% per år)."

  };

  // Track which descriptions should be shown
  const [showDescription, setShowDescription] = useState({});

  // Update state when gender changes
  useEffect(() => {
    setParameters(defaultParameters[selectedGender]);
    setCosts(defaultCosts[selectedGender]);
  }, [selectedGender]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value !== "" ? parseFloat(value) : "";

    setParameters((prev) => {
      const updatedParams = { ...prev, [name]: newValue };

          // Auto-calculate `tpDTS` only for "woman"
          if (selectedGender === "woman" && name === "tpDn") {
            updatedParams.tpDTS = parseFloat((newValue * 5).toFixed(3)); // Ensures 3 decimals
          }

          return updatedParams;
        });
      };

      const toggleDescription = (key) => {
        setShowDescription((prev) => ({
          ...prev,
          [key]: !prev[key] // Toggle visibility
        }));
      };

      const isFormValid = () => {
        return (
          Object.values(parameters).every(value => value !== "") &&
          Object.values(costs).every(value => value !== "")
        );
      };

  const handleSubmit = () => {
    if (!isFormValid()) {
      alert("Fyll i alla parametrar innan du sparar!");
      return;
    }

    const requestData = { gender: selectedGender, parameters, costs };
    console.log("Submitting modal data:", requestData);
    onSubmit(requestData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Fyll i parametrar</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Gender Selection Dropdown */}
        <Form.Group className="mb-3">
          <Form.Label>Välj kön:</Form.Label>
          <Form.Select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
          >
            <option value="man">Man</option>
            <option value="woman">Kvinna</option>
          </Form.Select>
        </Form.Group>

      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
      <Tab eventKey="transition" title="Övergångssannolikhet">
        <Row>
          {Object.keys(parameters).map((paramKey) => (
            <Col key={paramKey} md={4} className="mb-3">
              <Form.Group> 
                <Form.Label>
                  {paramKey}{" "}
                  <span
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => toggleDescription(paramKey)}
                  >
                    *
                  </span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name={paramKey}
                  value={parameters[paramKey]}
                  onChange={handleChange}
                  step="0.01"
                  readOnly={selectedGender === "woman" && paramKey === "tpDTS"} // tpDTS is read-only
                />
              
                {showDescription[paramKey] && (
                  <small className="description">{descriptions[paramKey]}</small>
                )}
              </Form.Group>
            </Col>
          ))}
        </Row>
      </Tab>


          <Tab eventKey="costs" title="Kostnader">
            <Row>
              {Object.keys(costs).map((costKey) => (
                <Col key={costKey} md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label>
                      {costKey}{" "}
                      <span
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => toggleDescription(costKey)}
                      >
                        *
                      </span>

                    </Form.Label>
                    <Form.Control
                      type="number"
                      name={costKey}
                      value={costs[costKey]}
                      onChange={(e) => handleChange(e, setCosts)}
                      step="1"
                    />
                    {showDescription[costKey] && <small className="description">{descriptions[costKey]}</small>}
                    
                  </Form.Group>
                </Col>
              ))}
            </Row>
          </Tab>
        </Tabs>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Stäng</Button>
        <Button variant="primary" onClick={handleSubmit}>Spara</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalForm;
