import React from 'react';
import "./results.css";

const Results = ({ results }) => {
    if (!results) return null;

    const stateNames = [
        "Ingen_undernäring",
        "Risk_för_undernäring",
        "Undernäring",
        "Fallolycka",
        "Trycksår",
        "Död"
    ];

    const renderMatrix = (matrix, title, isTransitionProbabilities = false) => (
        <div className="results-table-container">
            <h2 className="results-title">{title}</h2>
            <table className="results-table">
                <thead>
                    <tr>
                        <th>State</th>
                        {isTransitionProbabilities
                            ? stateNames.map((name, index) => (
                                  <th key={index}>{name}</th>
                              )) 
                            : matrix[0]?.map((_, index) => (
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
                                        ? value.toFixed(2) 
                                        : value || 'N/A'}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

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

        const renderSavings = (savings) => (
            <div className="results-table-container">
                <h2 className="results-title">Kostnadsbesparing</h2>
                <table className="results-table">
                    <thead>
                        <tr>
                            <th>Besparing</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{savings.Besparing} SEK</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );

return (
    <div className="results-container">
        <h1 className="results-header">Beräknat resultat</h1>

        {/* Commenting out Transition Probabilities */}
        {/* 
        {results['Transition Probabilities'] &&
            renderMatrix(
                results['Transition Probabilities']['utan_insats'],
                'Övergångssannolikheter (utan intervention)',
                true 
            )}
        {results['Transition Probabilities'] &&
            renderMatrix(
                results['Transition Probabilities']['med_insats'],
                'Övergångssannolikheter (med intervention)',
                true 
            )}
        */}

        {results['Population Results'] &&
            Object.entries(results['Population Results']).map(([scenario, data]) =>
                renderMatrix(data, `Population Results (${scenario})`)
            )}

        {results['Total Costs'] && renderTotalCosts(results['Total Costs'])}
        {results['Savings'] && renderSavings(results['Savings'])}
    </div>
);
};

export default Results;
