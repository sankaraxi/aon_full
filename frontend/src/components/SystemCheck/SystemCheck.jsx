import React from "react";
import { Link, useParams } from "react-router-dom";

export default function SystemCheck() {
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Candidate Instructions – Front-End Assessment (Pre-Test Notes)
      </h1>

      <p className="text-gray-700 mb-6">
        Welcome! Before you begin your front-end assessment, please take a moment to read these instructions carefully. This will help you make the best use of your time and the embedded coding environment.
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Environment Setup</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>You will be working in a browser-based VS Code environment (codeserver).</li>
          <li>The project is preconfigured with two frameworks: React and Vue.js.</li>
          <li>You may choose either React or Vue.js for this task — select the one you are most comfortable with.</li>
          <li>For styling, use the shared stylesheet: <code>App.css</code>.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">Configuration Setup</h2>
        <p className="text-gray-700 mb-2">Before starting the development:</p>
        <ul className="list-disc list-inside text-gray-700 mt-1 space-y-1">
          <li><strong>Step 1:</strong> Open the terminal and install the required npm modules.</li>
          <div>

            <img src="/npminstall.png"/>
          </div>
          <li><strong>Step 2:</strong> Also, verify <code>index.html</code> for the structure of HTML Components.</li>
          <div>
            <img src="/npmrundev.png"/>
          </div>
          <li><strong>Step 3:</strong> Check the App.js (for React) or App.vue (for Vue) file to understand the structure and the class names used.</li>
          <li>Based on those class names, create appropriate styles in the <code>App.css</code></li>
          <li>Also, review the <code>index.html</code> file located in the project folder to ensure that your layout aligns with any HTML structure-related test cases. This helps you meet all DOM and layout requirements during validation. </li>
          <li>Click the 'Output' button to view your output.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Folder Structure & File Usage</h2>
        <p className="text-gray-700 mb-2">Depending on your choice:</p>
        <p className="text-gray-700 font-medium">If using React:</p>
        <ul className="list-disc list-inside text-gray-700 mb-4 ml-4 space-y-1">
          <li>Entry File: <code>src/index.js</code></li>
          <li>Style File: <code>src/app.css</code></li>
        </ul>
        <p className="text-gray-700 font-medium">If using Vue.js:</p>
        <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
          <li>Entry File: <code>src/App.vue</code></li>
          <li>Style File: <code>src/app.css</code></li>
        </ul>
        <p className="mt-2 text-gray-700">
          Ensure that all required classes and selectors are styled in <code>app.css</code>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Submission Guidelines</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Once you complete the task, save all changes.</li>
          <li>Press the "Submit Assessment" button to run validation.</li>
          <li>You can submit the code multiple times within the 30-minute time limit to check your results.</li>
          <li>Your final submission before the deadline will be considered for evaluation.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">General Guidelines</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Use only the provided libraries (React or Vue). Do not install third-party libraries like Bootstrap or Tailwind.</li>
          <li>Follow clean coding practices — use meaningful class names, maintain indentation, and add comments where needed.</li>
          <li>Ensure your layout is responsive and follows the grid structure as specified in the task.</li>
        </ul>
        <p className="mt-4 text-center text-gray-700">
          All the best — build something neat and clean.
        </p>
      </section>

      <div className="mt-4">
        <Link to={`/user/${id}`}>
          <button className="w-full bg-green-600 text-white py-3 px-6 rounded-md shadow hover:bg-green-700 transition duration-200">
            Start Assessment
          </button>
        </Link>
      </div>
    </div>
  );
}
