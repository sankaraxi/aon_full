import React from 'react';
export function Download(){
const handleDownload = () => {
  fetch('http://localhost:5001/download')
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'generate-docker-compose.ps1'); // Replace with your file name
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    })
    .catch(err => console.error('Error downloading the file:', err));
};


    return (
      <div>
      <button onClick={handleDownload}>Download and Executercmd</button>
    </div>
    );
  }


