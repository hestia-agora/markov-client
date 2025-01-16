import React, { useState } from 'react';
import { runModel } from '../utils/api';
import  "./form.css";
const Form = ({ setResults }) => {
    const [formData, setFormData] = useState({
        gender: 'man',
        n_cohort: 1000,
        n_cycles: 10,
        Initial_age: 65,
        effect: 0.3,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'effect' ? parseFloat(value) : (name === 'gender' ? value : parseInt(value, 10)),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await runModel(formData);
            setResults(data);
        } catch (error) {
            alert('Error running the model. Please check the backend connection.');
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Markovmodellens parametrar</h2>
            <form onSubmit={handleSubmit} className="form">
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
            </form>
        </div>
    );
};

export default Form;
