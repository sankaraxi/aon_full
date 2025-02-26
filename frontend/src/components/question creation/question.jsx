import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Addcategory } from './add_category';
import MDEditor from '@uiw/react-md-editor';

export default function Corepage() {
  const [editorValue, setEditorValue] = useState('');
  const [displaycategory, setDisplaycategory] = useState([]);
  const [displaysubcategory, setDisplaysubcategory] = useState([]);
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState('');
  const [selectedElement, setSelectedElement] = useState('');
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [attributeValues, setAttributeValues] = useState({});
  const [elementValue, setElementValue] = useState('');
  const [storedData, setStoredData] = useState('');

  // Fetch categories on component mount
  useEffect(() => {
    fetch("http://localhost:5001/getcategory")
      .then(res => res.json())
      .then(data => setDisplaycategory(data));
  }, []);

  // Fetch subcategories based on selected category
  const handlesubcategory = () => {
    const category = document.getElementById("category_select").value;
    const key = { category };
    axios.post("http://localhost:5001/getsubcategory", key)
      .then((res) => {
        setDisplaysubcategory(res.data);
      });
  };

  // HTML elements and attributes
  const HTML_ELEMENTS = [
    'div', 'span', 'a', 'button', 'input', 'select', 'textarea', 'img', 'p', 'h1', 'h2', 'h3', 'ul', 'li',
  ];

  const HTML_ATTRIBUTES = {
    div: ['className', 'id', 'style'],
    span: ['className', 'id', 'style'],
    a: ['href', 'target', 'className', 'id', 'style'],
    button: ['type', 'onClick', 'className', 'id', 'style'],
    input: ['type', 'value', 'placeholder', 'onChange', 'className', 'id', 'style', 'name'],
    select: ['value', 'onChange', 'className', 'id', 'style'],
    textarea: ['value', 'onChange', 'className', 'id', 'style'],
    img: ['src', 'alt', 'className', 'id', 'style'],
    p: ['className', 'id', 'style'],
    h1: ['className', 'id', 'style'],
    h2: ['className', 'id', 'style'],
    h3: ['className', 'id', 'style'],
    ul: ['className', 'id', 'style'],
    li: ['className', 'id', 'style'],
  };

  // Add a new page
  const addPage = () => {
    if (!selectedPage) return;
    setPages([...pages, { name: selectedPage, elements: [] }]);
    setSelectedPage('');
  };

  // Add a new element to the selected page
  const addElement = () => {
    if (!selectedElement) return;

    const updatedPages = [...pages];
    const currentPage = updatedPages.find((page) => page.name === selectedPage);

    if (!currentPage) return;

    const newAttributes = Object.keys(selectedAttributes).map((attr) => ({
      name: attr,
      value: attributeValues[attr] || '',
    }));

    const newElement = {
      tagName: selectedElement,
      value: elementValue,
      attributes: newAttributes,
    };

    currentPage.elements.push(newElement);
    setPages(updatedPages);

    // Reset form
    setSelectedElement('');
    setSelectedAttributes({});
    setAttributeValues({});
    setElementValue('');
    setStoredData(JSON.stringify(pages, null, 2));
  };

  // Handle checkbox changes for attributes
  const handleCheckboxChange = (attribute, isChecked) => {
    setSelectedAttributes((prevAttributes) => ({
      ...prevAttributes,
      [attribute]: isChecked,
    }));
  };

  // Handle attribute value changes
  const handleAttributeValueChange = (attribute, value) => {
    setAttributeValues((prevValues) => ({
      ...prevValues,
      [attribute]: value,
    }));
  };

  // Submit question
  const handlesubmitquestion = (event) => {
    event.preventDefault();
    const jsondata = storedData;
    const question = editorValue;
    const category_id = document.getElementById("category_select").value;
    const subcategory_id = document.getElementById("subcategory_select").value;
    const key = { jsondata, question, category_id, subcategory_id };

    if (question === '') {
      alert("Please provide the question");
    } else {
      axios.post("http://localhost:5001/insertquestion", key)
        .then((res) => {
          if (res.data.status === "inserted") {
            alert("Question created successfully");
            window.location.reload();
          } else {
            alert("Question not created successfully");
          }
        });
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-2 gap-6">
        {/* Left Side: Category and Subcategory Selection */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Category</label>
            <select
              id="category_select"
              onChange={handlesubcategory}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="item1">Select the Category</option>
              {displaycategory.map((value, index) => (
                <option key={index} value={value.category_id}>{value.category_name}</option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Subcategory</label>
            <select
              id="subcategory_select"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select the Sub Category</option>
              {displaysubcategory.map((value, index) => (
                <option key={index} value={value.subcategory_id}>{value.subcategory_name}</option>
              ))}
            </select>
          </div>
          <Addcategory />
        </div>

        {/* Right Side: Question Editor */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-xl font-bold mb-4 text-gray-800">Question Editor</h1>
          <MDEditor
            value={editorValue}
            onChange={setEditorValue}
            className="w-full"
          />
        </div>
      </div>

      {/* User-Interface Testing Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">User-Interface Testing</h2>
        <div className="space-y-6">
          {/* Page Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Page Name</label>
            <input
              type="text"
              value={selectedPage}
              onChange={(e) => setSelectedPage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addPage}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Page
            </button>
          </div>

          {/* Select Page */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Page</label>
            <select
              value={selectedPage}
              onChange={(e) => setSelectedPage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Page</option>
              {pages.map((page) => (
                <option key={page.name} value={page.name}>{page.name}</option>
              ))}
            </select>
          </div>

          {/* Select Element */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Element</label>
            <select
              value={selectedElement}
              onChange={(e) => setSelectedElement(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Element</option>
              {HTML_ELEMENTS.map((element) => (
                <option key={element} value={element}>{element}</option>
              ))}
            </select>
          </div>

          {/* Select Attributes */}
          {selectedElement && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Attributes</label>
              {HTML_ATTRIBUTES[selectedElement].map((attribute) => (
                <div key={attribute} className="mb-2">
                  <input
                    type="checkbox"
                    id={attribute}
                    name={attribute}
                    checked={selectedAttributes[attribute]}
                    onChange={(e) => handleCheckboxChange(attribute, e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor={attribute}>{attribute}</label>
                  {selectedAttributes[attribute] && (
                    <input
                      type="text"
                      placeholder={`Enter value for ${attribute}`}
                      value={attributeValues[attribute] || ''}
                      onChange={(e) => handleAttributeValueChange(attribute, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Element Value Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Element Value</label>
            <input
              type="text"
              value={elementValue}
              onChange={(e) => setElementValue(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Add Element Button */}
          <button
            onClick={addElement}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Add Element
          </button>

          {/* Created Testcase Table */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Created Testcase</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Page Name</th>
                  <th className="border p-2 text-left">Element</th>
                  <th className="border p-2 text-left">Value</th>
                  <th className="border p-2 text-left">Attributes</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((page) =>
                  page.elements.map((element, index) => (
                    <tr key={`${page.name}-${index}`} className="hover:bg-gray-50">
                      <td className="border p-2">{page.name}</td>
                      <td className="border p-2">{element.tagName}</td>
                      <td className="border p-2">{element.value}</td>
                      <td className="border p-2">
                        {element.attributes.map((attr, attrIndex) => (
                          <p key={attrIndex}>{attr.name}: {attr.value}</p>
                        ))}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Question Button */}
      <button
        type="submit"
        onClick={handlesubmitquestion}
        className="mt-6 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 float-right"
      >
        Create Question
      </button>
    </div>
  );
}