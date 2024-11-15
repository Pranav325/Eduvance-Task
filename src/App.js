import React, { useState } from 'react';
import './styles.css';
import FileUpload from './components/FileUpload/FileUpload';
import DatasetAnalysis from './components/DatasetAnalysis/DatasetAnalysis';

function App() {
  const [analysisData, setAnalysisData] = useState(null);

  const handleAnalysisComplete = (data) => {
    setAnalysisData(data);
  };

  return (
    <div className="App">
      <h1>Diabetes Dataset Processor</h1><br></br>
      <FileUpload onAnalysisComplete={handleAnalysisComplete} />
      <DatasetAnalysis analysisData={analysisData} />
    </div>
  );
}

export default App;
