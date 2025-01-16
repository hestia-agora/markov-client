import React from 'react';
import "./results.css";

const Results = ({ results }) => {
    if (!results) return null;

    // Define the state names
    const stateNames = [
        "Ingen_undernäring",
        "Risk_för_undernäring",
        "Undernäring",
        "Fallolycka",
        "Trycksår",
        "Död"
    ];

    // Render a single matrix with a title
    const renderMatrix = (matrix, title) => (
        <div className="results-table-container">
            <h2 className="results-title">{title}</h2>
            <table className="results-table">
                <thead>
                    <tr>
                        <th>State</th>
                        {matrix[0]?.map((_, index) => (
                            <th key={index}>Cycle {index + 1}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {matrix.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td>{stateNames[rowIndex] || `State ${rowIndex + 1}`}</td>
                            {row.map((value, colIndex) => (
                                <td key={colIndex}>
                                    {typeof value === 'number'
                                        ? value.toFixed(2) // Format numbers
                                        : value || 'N/A'}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    // Render total costs table
    const renderTotalCosts = (costs) => (
        <div className="results-table-container">
            <h2 className="results-title">Sammanlagd kostnadskalkyl</h2>
            <table className="results-table">
                <thead>
                    <tr>
                        <th>Scenario</th>
                        <th>Kost</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(costs).map(([scenario, cost]) => (
                        <tr key={scenario}>
                            <td>{scenario}</td>
                            <td>{cost}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="results-container">
            <h1 className="results-header">Beräknat resultat</h1>

            {/* Transition Probabilities */}
            {results['Transition Probabilities'] &&
                renderMatrix(
                    results['Transition Probabilities']['utan_insats'],
                    'Övergångssannolikheter (utan intervention)'
                )}
            {results['Transition Probabilities'] &&
                renderMatrix(
                    results['Transition Probabilities']['med_insats'],
                    'Övergångssannolikheter (med intervention)'
                )}

            {/* Population Results */}
            {results['Population Results'] &&
                Object.entries(results['Population Results']).map(([scenario, data]) =>
                    renderMatrix(data, `Population Results (${scenario})`)
                )}

            {/* Cycle Costs */}
            {results['Cycle Costs'] &&
                Object.entries(results['Cycle Costs']).map(([scenario, data]) =>
                    renderMatrix([data], `Kostnad per cykel (${scenario})`)
                )}

            {/* Total Costs */}
            {results['Total Costs'] && renderTotalCosts(results['Total Costs'])}
        </div>
    );
};

export default Results;
