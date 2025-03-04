import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import DockerCommand from "../DockerCommand";

export default   function SystemCheck() {
  var { id } = useParams();
  const [tests, setTests] = useState([
    { id: 1, name: "Install the Docker Desktop", status: false },
    // { id: 2, name: 'Speed Internet', status: false },
    // { id: 3, name: 'Test 3', status: false },

  ]);
  const [testStatus, setTestStatus] = useState("Initial");
  const [dockerStatus, setDockerStatus] = useState(null);
  const [downloaded, setDownloaded] = useState(false);

  const handleCheckSystemSpec = () => {
    setTests(tests.map((test) => ({ ...test, status: true })));
    setTestStatus("Checked");
    checkDocker();  
  };

  const checkDocker = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/check-docker");
      setDockerStatus(response.data);
    } catch (error) {
      setDockerStatus({ installed: false, message: "Error checking Docker status" });
    }
  };

  //handle yml file click

  const handleYMLFileClick = async () => {
    try {
      // Fetch the YML file from the server
      const response = await fetch('http://localhost:5001/api/demoymlfile');
      
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Failed to fetch YML file: ${response.status} ${response.statusText}`);
      }

      if(response.ok){
        setDownloaded(true);
      }
      
      // Get the YML content as text
      const ymlContent = await response.text();
      
      // Create a Blob from the YML content
      const blob = new Blob([ymlContent], { type: 'application/x-yaml' });
      
      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);
      
      // Create a temporary anchor element
      const a = document.createElement('a');
      a.href = url;
      a.download = 'docker-compose.yml';
      
      // Append the anchor to the body, click it, and then remove it
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
      
      console.log('YML file download initiated');
    } catch (error) {
      console.error('Error downloading YML file:', error);
      alert('Failed to download YML file. Please try again later.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Coding Test Portal Instructions & Terms
      </h1>

      {/* Instructions Section */}
      <section className="mt-4">
        <h2 className="text-xl font-semibold text-gray-700">Instructions for the Coding Test</h2>
        <h3 className="text-lg font-medium text-gray-600 mt-4">General Instructions:</h3>
        <ul className="list-disc list-inside text-gray-600">
          <li><strong>Duration:</strong> The coding test will last for 3 hours.</li>
          <li><strong>Proctoring:</strong> This is a proctored examination. Your webcam and microphone must be on throughout the test.</li>
          <li><strong>Environment:</strong> Ensure you are in a quiet, well-lit room free from disturbances.</li>
        </ul>
        
        <h3 className="text-lg font-medium text-gray-600 mt-4">System Requirements:</h3>
        <ul className="list-disc list-inside text-gray-600">
          <li>A laptop or desktop computer with a webcam and microphone.</li>
          <li>Stable internet connection.</li>
          <li>Latest version of Chrome or Firefox browser.</li>
        </ul>
        
        <h3 className="text-lg font-medium text-gray-600 mt-4">Tools Allowed:</h3>
        <p>You may use any coding environment or editor of your choice, but all submissions must be done through the portal.</p>
        
        <h3 className="text-lg font-medium text-gray-600 mt-4">No External Help:</h3>
        <p>You are not allowed to use any external resources or receive assistance from others during the test.</p>
        
        <h3 className="text-lg font-medium text-gray-600 mt-4">Before the Test:</h3>
        <ul className="list-disc list-inside text-gray-600">
          <li><strong>Login:</strong> Ensure you have the correct login credentials.</li>
          <li><strong>Identity Verification:</strong> You will need to show a valid photo ID.</li>
          <li><strong>System Check:</strong> Perform a system check.</li>
        </ul>
        
        <h3 className="text-lg font-medium text-gray-600 mt-4">During the Test:</h3>
        <ul className="list-disc list-inside text-gray-600">
          <li><strong>Submission:</strong> All answers must be submitted through the portal.</li>
          <li><strong>Proctoring Alerts:</strong> Suspicious activity will be flagged.</li>
          <li><strong>Breaks:</strong> No breaks are allowed.</li>
          <li><strong>Queries:</strong> Use the provided chat support.</li>
        </ul>
        
        <h3 className="text-lg font-medium text-gray-600 mt-4">After the Test:</h3>
        <ul className="list-disc list-inside text-gray-600">
          <li><strong>Automatic Grading:</strong> Results will be available within 24 hours.</li>
          <li><strong>Feedback:</strong> You will receive feedback.</li>
        </ul>
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-semibold text-gray-700">Terms and Conditions</h2>
        <ul className="list-disc list-inside text-gray-600">
          <li><strong>Acceptance of Terms:</strong> By participating, you agree to follow the rules.</li>
          <li><strong>Proctoring Agreement:</strong> You consent to being monitored.</li>
          <li><strong>Privacy:</strong> Your personal information will remain confidential.</li>
          <li><strong>Code of Conduct:</strong> Any cheating or plagiarism will result in disqualification.</li>
          <li><strong>Technical Issues:</strong> The portal is not responsible for your device or connection issues.</li>
          <li><strong>Submission Responsibility:</strong> Ensure your code is correctly submitted.</li>
          <li><strong>Disqualification:</strong> Any violation may lead to disqualification.</li>
          <li><strong>Appeals:</strong> You may appeal within 48 hours of results.</li>
        </ul>
        <p>By participating, you confirm that you have read and agreed to these terms.</p>
      </section>

      {/* System Check Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">System Check</h2>
        <ul className="space-y-2 mt-3">
          {tests.map((test) => (
            <li key={test.id} className="flex items-center text-gray-700">
              {test.name} {test.status && <span className="ml-2 text-green-600">✔</span>}
            </li>
          ))}
        </ul>
      </section>

      {/* Docker Status Check (Commented Out) */}
      {dockerStatus && (
        <>
            <p className="text-gray-700 mt-3">
                {dockerStatus.installed ? `Docker is installed: ${dockerStatus.message}` : dockerStatus.message}
            </p>
            <div>
                <button onClick={handleYMLFileClick} className="mt-2 rounded-sm cursor-pointer bg-amber-200 p-2">Download YML File</button>
            </div>
        </>
       

      )}

      { downloaded && <DockerCommand /> }

      {console.log(dockerStatus)}

      {/* Button Section */}
      {testStatus === "Checked" ? (
        <div className="mt-4">
          <Link
            to={`/user/${id}`}
          >
            <button disabled={!downloaded} className={`block w-full text-center bg-green-500 text-white py-2 px-4 rounded-md shadow hover:bg-green-600 transition ${downloaded ? "cursor-pointer" : "cursor-not-allowed"}`}>
              Start Assessment
            </button>
            
          </Link>
        </div>
      ) : (
        <button
          onClick={handleCheckSystemSpec}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 transition"
        >
          Check System Specifications
        </button>
      )}
    </div>
  );
}
