import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap'; 
import { runModel } from '../utils/api';
import './form.css';
import logoImage from '../assets/logos/hestia-agora.png';
import ModalForm from './ModalForm'; 

const FormComponent = ({ setResults }) => {  
  const [formData, setFormData] = useState({
    gender: 'man',
    n_cohort: 1000,
    n_cycles: 20,
    Initial_age: 65,
    effect: 0.3,
    insats: 'dietist'
  });

  // Store parameters separately for each gender
  const [modalData, setModalData] = useState({
    man: { parameters: {}, costs: {} },
    woman: { parameters: {}, costs: {} }
  });

  const [showModal, setShowModal] = useState(false); 

  const handleShowModal = () => setShowModal(true); 
  const handleCloseModal = () => setShowModal(false); 

  // Handle changes in form fields (including gender selection)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'effect' ? parseFloat(value) : value
    }));
  };

  // Handle modal submission - store parameters separately per gender
  const handleModalSubmit = (data) => {
    setModalData((prev) => ({
      ...prev,
      [data.gender]: { parameters: data.parameters, costs: data.costs }
    }));

    alert("Alla parametrar är sparade!");
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Get parameters based on the selected gender
    const selectedGenderData = modalData[formData.gender];

    if (!selectedGenderData.parameters || !selectedGenderData.costs || 
        Object.keys(selectedGenderData.parameters).length === 0 || 
        Object.keys(selectedGenderData.costs).length === 0) {
      alert("Vänligen fyll i alla modalparametrar innan du beräknar.");
      return;
    }
  
    const requestData = {
      ...formData,
      parameters: selectedGenderData.parameters,
      costs: selectedGenderData.costs,
    };
  
    console.log("Sending to backend:", requestData);
  
    try {
      const data = await runModel(requestData);
      setResults(data);
    } catch (error) {
      alert("Error running the model. Please check the backend connection.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Markov Modell</h2>
      <form onSubmit={handleSubmit} className="form">

        <Button variant="light" onClick={handleShowModal}>
          Lägg till parametrar
        </Button>

        {/* Pass selected gender and previously saved data for that gender */}
        <ModalForm 
          show={showModal} 
          handleClose={handleCloseModal} 
          onSubmit={handleModalSubmit} 
          gender={formData.gender} 
          existingData={modalData[formData.gender]} 
        />

        <div className="form-group">
          <label htmlFor="insats">Välj åtgärde:</label>
          <select
            id="insats"
            name="insats"
            value={formData.insats}
            onChange={handleChange}
            className="form-input"
          >
            <option value="dietist">Dietist</option>
            <option value="näringsrik">Näringsrik</option>
            <option value="rehabilitering">Rehabilitering</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="gender">Välj kön:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="form-input"
          >
            <option value="man">Man</option>
            <option value="woman">Kvinna</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="n_cohort">Kohortstorlek:</label>
          <input
            type="number"
            id="n_cohort"
            name="n_cohort"
            value={formData.n_cohort}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="n_cycles">Antal cykler:</label>
          <input
            type="number"
            id="n_cycles"
            name="n_cycles"
            value={formData.n_cycles}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="Initial_age">Ingångsålder:</label>
          <input
            type="number"
            id="Initial_age"
            name="Initial_age"
            value={formData.Initial_age}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="effect">Interventionseffekt:</label>
          <input
            type="number"
            id="effect"
            name="effect"
            value={formData.effect}
            onChange={handleChange}
            className="form-input"
            step="0.01"
            min="0"
            max="1"
          />
        </div>

        <button type="submit" className="form-button">
          Beräkning
        </button>

        <img className="logoImage" src={logoImage} alt="hestia agora brand logo image" />
      </form>
    </div>
  );
};

export default FormComponent;
