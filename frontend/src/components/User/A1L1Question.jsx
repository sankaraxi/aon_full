import React from "react";

export default function A1L1Question() {
  return (
    <div className="container mx-auto p-6 text-gray-900 font-sans leading-relaxed">
      <h1 className="text-2xl font-bold mb-2 text-blue-800">QP Code: A1L1</h1>

      <h2 className="text-xl font-semibold mb-2">Problem Statement:</h2>
      <p className="mb-4">
        Your task is to develop a simple dashboard web page that matches the design shown in the image. The page must be styled and structured to include a left-hand vertical sidebar, a header title, three metric cards, and a footer.
      </p>

      <h3 className="font-semibold text-lg mt-6 mb-2">UI Layout Requirements:</h3>
      <ol className="list-decimal pl-6 space-y-2">
        <li>
          <strong>Sidebar</strong> (left-aligned, dark background):
          <ul className="list-disc pl-6">
            <li>Home</li>
            <li>Reports</li>
            <li>Analytics</li>
            <li>Settings</li>
          </ul>
        </li>
        <li>
          <strong>Main Content Area</strong>:
          <ul className="list-disc pl-6">
            <li><strong>Header Section:</strong> A blue banner with the title <em>“Dashboard”</em> in white, bold, large font, center-aligned.</li>
            <li><strong>Metrics Section:</strong> Below the header, show three cards:
              <ul className="pl-6 list-disc">
                <li><strong>Card 1:</strong> Visitors – 1,204 today</li>
                <li><strong>Card 2:</strong> Revenue – $3,421</li>
                <li><strong>Card 3:</strong> Performance – 76%</li>
              </ul>
            </li>
            <li>Cards must have white background, slight shadow, and rounded corners.</li>
            <li><strong>Footer Section:</strong> A gray box with the text <code>© 2025 My Dashboard</code>, centered at the bottom.</li>
          </ul>
        </li>
      </ol>

      <h3 className="font-semibold text-lg mt-6 mb-2">Technical Constraints:</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Use React or plain HTML/CSS/JS (your choice).</li>
        <li>The layout must be responsive.</li>
        <li>You may use Tailwind CSS, Bootstrap, or write your own custom CSS.</li>
        <li>Ensure proper spacing, alignment, and font usage to match the provided design closely.</li>
      </ul>

      <h3 className="font-semibold text-lg mt-6 mb-2">🎯 Bonus Points:</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Highlight the current page in the sidebar (e.g., Home).</li>
        <li>Add hover effects on the sidebar items or metric cards.</li>
      </ul>
        <img src="/A1L1.jpeg"  width ="800" />
      <h3 className="font-semibold text-lg mt-6 mb-2">Evaluation Matrix:</h3>
      <table className="w-full text-sm border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">S.No</th>
            <th className="border p-2">Test Name</th>
            <th className="border p-2">Sector</th>
            <th className="border p-2">Property / Expected Value</th>
            <th className="border p-2">Category</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["1", "HTML Structure Validation", "html", "Valid HTML, Head, Title, Meta, Body", "HTML Semantics - Basic Structure"],
            ["2", "Sidebar color check", ".sidebar", "#343a40 (→ rgb(52, 58, 64))", "Visual Appealing - External Library Elem."],
            ["3", "Aesthetic Element - Header", ".header", "#007bff (→ rgb(0, 123, 255))", "Visual Appealing - Aesthetics Element"],
            ["4", "Sidebar Link Hover Background", ".sidebar ul li a", "#495057 (→ rgb(73, 80, 87))", "CSS Styling - Animations & Effects"],
            ["5", "Footer center aligned", "footer", "textAlign: center", "Visual Appealing - Aesthetics Element"],
            ["6", "Card border radius aesthetic", ".card", "borderRadius: 12px", "Visual Appealing - Aesthetics Element"],
            ["7", "Main structure grid layout", "main", "display: grid", "CSS - Structure of a page"],
            ["8", "Card hover smooth translate effect", ".card", "transform: translateY(-5px)", "CSS Style - Smoothness & Performance"],
            ["9", "Font family is Segoe UI", "body", '"Segoe UI", sans-serif', "Visual Appealing - Fundamental Elements"],
            ["10", "Sidebar link transition timing", ".sidebar ul li a", "transition: background 0.3s ease", "CSS Styling - Animations & Effects"],
            ["11", "Main padding responsive", "main", "padding: 1rem", "CSS - Device Responsive"],
            ["12", "Main margin-left layout", "main", "marginLeft: 220px", "CSS - Structure of a page"],
          ].map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="border p-2">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="font-semibold text-lg mt-6 mb-2">Instructions to Candidate:</h3>
      <ul className="list-disc pl-6">
        <li>The evaluation script will automatically check your HTML/CSS.</li>
        <li>Follow semantic HTML and CSS practices.</li>
        <li>Use appropriate units (px, rem, etc.) and match exact color codes.</li>
        <li>Transitions and hover effects must be visually noticeable.</li>
      </ul>

      <p className="mt-4"><strong>Duration:</strong> <span className="text-red-600 font-semibold">1 Hr.</span></p>
    </div>
  );
}