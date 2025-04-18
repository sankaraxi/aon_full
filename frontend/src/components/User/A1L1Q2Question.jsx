import React from "react";

export default function A1L1Q02Question() {
  return (
    <div className="container mx-auto p-6 text-gray-900 font-sans leading-relaxed">
      <h1 className="text-2xl font-bold mb-2 text-blue-800">QP Code: A1L1Q02</h1>

      <h2 className="text-xl font-semibold mb-2">Objective:</h2>
      <p className="mb-4">
        You are required to build a simple responsive <strong>Technology Grid Showcase Page</strong> using HTML and CSS (JavaScript is optional) that visually aligns with the layout and behavior described below. Your implementation will be evaluated against a defined set of layout, styling, and responsiveness criteria.
      </p>
      <div>
        <img src="/a1l1q2.jpeg" alt="Technology Grid Page Example" className="w-full mb-4" />
      </div>

      <h3 className="font-semibold text-lg mt-6 mb-2">Task Requirements:</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>Create a clean and responsive technology section that displays technology cards/icons in a grid layout. Use placeholder images or SVGs to represent technologies.</li>
        <li>Each card should contain:
          <ul className="list-disc pl-6">
            <li>A fixed-size technology icon/image</li>
            <li>A technology name/title</li>
          </ul>
        </li>
      </ul>

      <h3 className="font-semibold text-lg mt-6 mb-2">CSS Styling Rules:</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Grid Container:</strong>
          <ul className="list-disc pl-6">
            <li>Use CSS Grid layout for the technology section (<code>display: grid</code>)</li>
            <li>Set the grid to adjust dynamically, maintaining a minimum card width around <code>200px</code></li>
            <li>Gap between grid items: around <code>1.5rem</code></li>
            <li>Responsive layout: collapses to fewer columns on smaller screens</li>
          </ul>
        </li>
        <li><strong>Card:</strong>
          <ul className="list-disc pl-6">
            <li>Soft white background</li>
            <li>Subtle border-radius</li>
            <li>Light shadow to lift from background</li>
            <li>Padding inside card</li>
            <li>Hover effect: move upward slightly with smooth transition (<code>transform: translateY(...)</code>)</li>
          </ul>
        </li>
        <li><strong>Image:</strong>
          <ul className="list-disc pl-6">
            <li>Centered both vertically and horizontally</li>
            <li>Approximately <code>64px × 64px</code>, square-sized, maintain aspect ratio</li>
            <li>Should not overflow the card</li>
          </ul>
        </li>
        <li><strong>Typography:</strong>
          <ul className="list-disc pl-6">
            <li>Titles center-aligned, bold, and spaced from the icon</li>
            <li>Use modern sans-serif font</li>
            <li>Optional subtext: lighter and muted color</li>
          </ul>
        </li>
        <li><strong>Page & Wrapper:</strong>
          <ul className="list-disc pl-6">
            <li>Main container centered with appropriate max-width</li>
            <li>Padding: <code>30px</code> vertically and <code>20px</code> horizontally</li>
            <li>Neutral background color (e.g., light grey)</li>
          </ul>
        </li>
        <li><strong>HTML Semantics:</strong> Use semantic tags like <code>&lt;section&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;article&gt;</code>, and <code>&lt;figure&gt;</code></li>
      </ul>

      <h3 className="font-semibold text-lg mt-6 mb-2">✅ Evaluation Checklist:</h3>
      <table className="w-full text-sm border border-gray-300 mb-6">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Category</th>
            <th className="border p-2">Criteria</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Layout", "Responsive grid layout with flexible column count and consistent spacing"],
            ["Styling", "Cards have padding, shadows, rounded corners, hover effects, and image sizing"],
            ["Responsiveness", "Device responsive"],
            ["Code Quality", "Clean, semantic HTML structure; reusable and readable CSS"],
            ["Performance", "Page loads quickly and renders consistently"]
          ].map(([category, criteria], idx) => (
            <tr key={idx}>
              <td className="border p-2 font-medium">{category}</td>
              <td className="border p-2">{criteria}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}
