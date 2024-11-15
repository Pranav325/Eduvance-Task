import React from 'react';

function DatasetAnalysis({ analysisData }) {
  if (!analysisData) {
    return null;  
  }

  return (
    <div className="dataset-analysis">
    <h2>Analysis Results</h2>
    
    <p><strong>Total Rows:</strong> {analysisData.totalRows}</p>
    <p><strong>Shape:</strong> {analysisData.shape[0]} rows, {analysisData.shape[1]} columns</p>
    
    <div className="analysis-section">
        <h3>Missing Values</h3>
        <ul>
            {Object.entries(analysisData.missingValues).map(([key, value]) => (
                <li key={key}>
                    <span>{key}</span>  <span>{value}</span>
                </li>
            ))}
        </ul>
    </div>
    
    <div className="analysis-section">
        <h3>Averages</h3>
        <ul>
            {Object.entries(analysisData.averages).map(([key, value]) => (
                <li key={key}>
                    <span>{key}</span>  <span>{value.toFixed(2)}</span>
                </li>
            ))}
        </ul>
    </div>
</div>

  );
}

export default DatasetAnalysis;
