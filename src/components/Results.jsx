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

    const renderMatrix = (matrix, title) => {
        if (!matrix || matrix.length === 0) return null;

        // Transpose matrix (Cycles as rows, States as columns)
        const transposedMatrix = matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));

        return (
            <div className="results-table-container">
                <h2 className="results-title">{title}</h2>
                <table className="results-table">
                    <thead>
                        <tr>
                            <th>Cycle</th> {/* Cycles as rows */}
                            {stateNames.map((name, index) => (
                                <th key={index}>{name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {transposedMatrix.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td>Cycle {rowIndex + 1}</td> {/* Labeling row as "Cycle X" */}
                                {row.map((value, colIndex) => (
                                    <td key={colIndex}>
                                        {typeof value === 'number' ? value.toFixed(2) : value || 'N/A'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };
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

                {results['Total Costs'] && renderTotalCosts(results['Total Costs'])}
                {results['Savings'] && renderSavings(results['Savings'])}
        
                {results['Population Results'] &&
                    Object.entries(results['Population Results']).map(([scenario, data]) =>
                        renderMatrix(data, `Population Results (${scenario})`)
                    )}
    
            </div>
        );
};

export default Results;


