import React from "react";

export function Transferfile(){
    const handleTransfer = async () => {
        const response = await fetch('http://localhost:5001/transfer-files', {
          method: 'POST',
        });
    
        if (response.ok) {
          console.log('Files transferred successfully');
        } else {
          console.error('Failed to transfer files');
        }
      };
    return(
        <>
            <div className="App">
      <button onClick={handleTransfer}>Transfer Files</button>
    </div>
        </>
    );
}