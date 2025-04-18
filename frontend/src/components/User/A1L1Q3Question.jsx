import React from "react";

export default function A1L1Q03Question() {
  return (
    <div className="container mx-auto p-6 text-gray-900 font-sans leading-relaxed">
      <h1 className="text-2xl font-bold mb-2 text-blue-800">QP Code: A1L1Q03</h1>

      <h2 className="text-xl font-semibold mb-2">Objective:</h2>
      <p className="mb-4">
        You are required to build a simple responsive <strong>Product Grid Page</strong> using HTML and CSS (JavaScript is optional) that visually aligns with the layout and behavior described below. Your implementation will be evaluated against a defined set of layout, styling, and responsiveness criteria.
      </p>

      <h3 className="font-semibold text-lg mt-6 mb-2">Task Requirements:</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>Create a product listing page that displays product cards in a grid layout.</li>
        <li>Each product card should contain:
          <ul className="list-disc pl-6">
            <li>A fixed-size image (can be placeholder)</li>
            <li>A product title</li>
            <li>(Optional) a short description or price tag</li>
          </ul>
        </li>
      </ul>

      <h3 className="font-semibold text-lg mt-6 mb-2">CSS Styling Rules:</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>Use CSS Grid layout for the product listing: <code>display: grid</code></li>
        <li>Grid should have 4 equal-width columns: <code>repeat(4, 1fr)</code></li>
        <li>Gap between grid items: <code>20px</code></li>
        <li>Each product card:
          <ul className="list-disc pl-6">
            <li>Padding: <code>15px</code></li>
            <li>1px solid grey border</li>
            <li>Hover effect: translate upward by 5px (<code>transform: translateY(-5px)</code>)</li>
          </ul>
        </li>
        <li>Image inside card: <code>100px × 100px</code></li>
        <li>Product titles should be <strong>center-aligned</strong></li>
        <li>Overall container padding: <code>30px</code> top/bottom, <code>20px</code> left/right</li>
        <li>Layout must be device responsive and adjust to smaller screens</li>
        <li>HTML should be semantically structured (use of <code>html</code>, <code>head</code>, <code>body</code>, <code>section</code>, etc.)</li>
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
            ["Layout", "Uses CSS Grid, correct column count, spacing, and card placement"],
            ["Styling", "Padding, borders, image sizing, text alignment, and hover effect"],
            ["Responsiveness", "Device Responsive"],
            ["Code Quality", "Clean HTML structure, semantic tags used, reusable CSS"],
            ["Performance", "Page loads quickly without excessive rendering or layout shifts"]
          ].map(([category, criteria], idx) => (
            <tr key={idx}>
              <td className="border p-2 font-medium">{category}</td>
              <td className="border p-2">{criteria}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <img src="/a1l1q3img.png" alt="Product Grid Page Example" className="w-full mb-4" />
      </div>
    </div>
  );
}
