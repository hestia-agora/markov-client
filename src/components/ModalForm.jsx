import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Tabs, Tab } from "react-bootstrap";
import "./modal.css"; 

const ModalForm = ({ show, handleClose }) => {
  const [key, setKey] = useState("transition");

  const [parameters, setParameters] = useState({
    tpDn: 0.08,
    tpDRU: 0,
    tpDU: 0.23,
    tpDFO: 0.23,
    tpDTS: 0.23,
    tpIU_RU: 0.0,
    tpIU_U: 0.0,
    tpIU_FO: 0.0,
    tpIU_TS: 0.0,
    tpRU_IU: 0.05,
    tpRU_U: 0.0,
    tpU_RU: 0.10,
    tpU_FO: 0.00,
    tpU_TS: 0.00,
    tpFO_RU: 0.03,
    tpFO_U: 0.05,
    tpFO_TS: 0.01,
    tpTS_U: 0.30,
    tpTS_FO: 0.15,
  });

  const [costs, setCosts] = useState({
    cIU: 0,
    cRU: 0,
    cU: 130240,
    cFO: 273600,
    cTS: 55000,
    cDeath: 0,
  });

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
  };

  const [showDescription, setShowDescription] = useState({});

  const handleToggleDescription = (param) => {
    setShowDescription((prev) => ({
      ...prev,
      [param]: !prev[param],
    }));
  };

  const handleChange = (e, setState) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: parseFloat(e.target.value),
    }));
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Fyll i parametrar</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
          
          <Tab eventKey="transition" title="Övergångssannolikhet">
            <div className="tab-content">
              <Row>
                {Object.keys(parameters).map((key) => (
                  <Col key={key} md={4} className="mb-3">
                    <Form.Group>
                      <Form.Label>
                        {key}{" "}
                        <span
                          style={{ color: "red", cursor: "pointer" }}
                          onClick={() => handleToggleDescription(key)}
                        >
                          *
                        </span>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name={key}
                        value={parameters[key]}
                        onChange={(e) => handleChange(e, setParameters)}
                        step="0.01"
                      />
                      {showDescription[key] && <small className="description">{descriptions[key]}</small>}
                    </Form.Group>
                  </Col>
                ))}
              </Row>
            </div>
          </Tab>

          <Tab eventKey="costs" title="Kostnader">
            <div className="tab-content">
              <Row>
                {Object.keys(costs).map((key) => (
                  <Col key={key} md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>
                        {key}{" "}
                        <span
                          style={{ color: "blue", cursor: "pointer" }}
                          onClick={() => handleToggleDescription(key)}
                        >
                          *
                        </span>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name={key}
                        value={costs[key]}
                        onChange={(e) => handleChange(e, setCosts)}
                        step="1"
                      />
                      {showDescription[key] && <small className="description">{descriptions[key]}</small>}
                    </Form.Group>
                  </Col>
                ))}
              </Row>
            </div>
          </Tab>

        </Tabs>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Stäng
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Spara
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalForm;
