import React, { useState } from 'react';
const LAMBDA_URL = process.env.REACT_APP_LAMBDA_URL;
function FileUpload({ onAnalysisComplete }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(''); 

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    
    if (selectedFile && selectedFile.type !== 'text/csv') {
      setError("Please upload a file in CSV format only.");
      setFile(null);
      setStatus('');
      return;
    }

    setFile(selectedFile);
    setError(null);
    setStatus('');
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!file) {
      setError("Please select a CSV file.");
      return;
    }

    setStatus('Processing...'); 

    const reader = new FileReader();
    reader.onload = async () => {
      const fileContent = reader.result;

      try {
        const res = await fetch(LAMBDA_URL, { 
          method: 'POST',
          headers: {
            'Content-Type': 'text/csv',
          },
          body: fileContent,
        });
        
        const data = await res.json();
        
        if (res.ok) {
          setStatus('Success');  
          onAnalysisComplete(data); 
        } else {
          setStatus(''); 
          setError(data.error || "Failed to process the file.");
        }
      } catch (err) {
        setStatus(''); 
        setError("Error connecting to the server.");
      }
    };

    reader.onerror = () => {
      setStatus(''); 
      setError("Error reading the file.");
    };

    reader.readAsText(file);
  };

  return (
    <div className="file-upload">
      <h2>Upload a CSV File</h2>
      <form onSubmit={handleSubmit} className="file-upload-form">
        <input 
          type="file" 
          accept=".csv" 
          onChange={handleFileChange} 
          className="file-input" 
        />
        <button type="submit" className="upload-button" disabled={status === 'Processing...'}>
          {status === 'Processing...' ? 'Processing...' : 'Upload and Process'}
        </button>
      </form>

      {file && (
        <div className="file-info">
          Selected file: {file.name}
        </div>
      )}
      
      {error && <p className="error-message">{error}</p>}
      {status && !error && <p className="status-message">{status}</p>}
    </div>
  );
}

export default FileUpload;
