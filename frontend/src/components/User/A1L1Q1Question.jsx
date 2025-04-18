import React from "react";

export default function A1L1Q01Question() {
  return (
    <div className="container mx-auto p-6 text-gray-900 font-sans leading-relaxed">
      <h1 className="text-2xl font-bold mb-2 text-blue-800">QP Code: A1L1Q01</h1>

      <h2 className="text-xl font-semibold mb-2">Objective:</h2>
      <p className="mb-4">
        You are required to build a simple, visually appealing <strong>Student Spotlight Card</strong> using HTML and CSS (JavaScript is optional) that highlights an individual student’s achievement. The card should follow a centered, card-based layout and conform to the design specifications described below. Your implementation will be evaluated against a defined set of layout, styling, and semantic structure criteria.
      </p>
      <div>
        <img src="/a1l1q1.jpeg" alt="Student Spotlight Card Example" className="w-full mb-4" />
      </div>
      <h3 className="font-semibold text-lg mt-6 mb-2">Task Requirements:</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>Create a clean and responsive Student Spotlight card layout that features a student's profile, name, and affiliation. The card should present the following elements:
          <ul className="list-disc pl-6">
            <li>A profile photo or avatar image</li>
            <li>A congratulatory title or phrase (e.g., 'Congratulations!')</li>
            <li>The student’s name as a link (styled appropriately)</li>
            <li>The full name of their institution</li>
            <li>An optional domain badge/logo representing the student's area of achievement</li>
          </ul>
        </li>
      </ul>

      <h3 className="font-semibold text-lg mt-6 mb-2">CSS Styling Rules:</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Card Container:</strong>
          <ul className="list-disc pl-6">
            <li>Flex layout with <code>flex-direction: column</code></li>
            <li>Horizontally and vertically centered</li>
            <li>Soft light-blue or off-white background (e.g., <code>#eaf9fb</code>)</li>
            <li>Padding ~<code>2rem</code>, border-radius ~<code>1rem</code></li>
            <li>Subtle box shadow</li>
            <li>Max-width ~<code>400px</code>, responsive layout</li>
          </ul>
        </li>
        <li><strong>Background:</strong> Full page with neutral, patterned background</li>
        <li><strong>Title Text:</strong>
          <ul className="list-disc pl-6">
            <li>Bold, prominent heading (e.g., 'Kudos!')</li>
            <li>Center-aligned, slightly larger font (~<code>1.5rem</code>)</li>
            <li>Margin-bottom ~<code>1rem</code> from profile image</li>
          </ul>
        </li>
        <li><strong>Profile Image:</strong>
          <ul className="list-disc pl-6">
            <li>Circular (<code>border-radius: 50%</code>), fixed size ~<code>100px × 100px</code></li>
            <li>Centered in the card, non-distorting, maintains aspect ratio</li>
            <li>Positioned above the student name</li>
          </ul>
        </li>
        <li><strong>Student Name (Hyperlink):</strong>
          <ul className="list-disc pl-6">
            <li>Color: blue (<code>#007bff</code>), no underline</li>
            <li>Acts as a link (e.g., profile/portfolio)</li>
            <li>Center-aligned, slightly larger font (~<code>1.2rem</code>)</li>
            <li>Hover: subtle underline effect</li>
          </ul>
        </li>
        <li><strong>Institution Name:</strong>
          <ul className="list-disc pl-6">
            <li>Full name, wrapped cleanly</li>
            <li>Muted gray color (~<code>#444444</code>), center-aligned</li>
            <li>Font size ~<code>1rem</code>, margin-top <code>0.5rem</code>, margin-bottom <code>1.5rem</code></li>
          </ul>
        </li>
        <li><strong>Badge / Logo:</strong> Represents relevant tech/domain (e.g., AWS, Ubuntu)
          <ul className="list-disc pl-6">
            <li>Icon size ~<code>50px × 50px</code>, positioned at the bottom</li>
          </ul>
        </li>
        <li><strong>HTML Semantics:</strong> Use semantic tags like <code>&lt;section&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;figure&gt;</code>, <code>&lt;figcaption&gt;</code>, <code>&lt;a&gt;</code></li>
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
            ["Layout", "Centered card layout with consistent spacing and responsive dimensions"],
            ["Styling", "Card uses padding, shadows, rounded corners, and hover effect on link"],
            ["Responsiveness", "Device Responsive"],
            ["Code Quality", "Semantic HTML structure; modular, reusable CSS"],
            ["Performance", "Image scaling, fast load time, and consistent rendering"]
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
