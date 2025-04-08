import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Addcategory from './add_category';
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
    fetch("http://192.168.252.230:5001/api/getcategory")
      .then(res => res.json())
      .then(data => setDisplaycategory(data));
  }, []);

  // Fetch subcategories based on selected category
  const handlesubcategory = () => {
    const category = document.getElementById("category_select").value;
    const key = { category };
    axios.post("http://192.168.252.230:5001/api/getsubcategory", key)
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
      axios.post("http://192.168.252.230:5001/api/insertquestion", key)
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
    <div className="container mx-auto p-4 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-blue-800 border-b-2 pb-3 border-blue-200">Question Builder & UI Testing</h1>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Left Side: Category and Subcategory Selection */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Category</label>
            <select
              id="category_select"
              onChange={handlesubcategory}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-200"
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
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-200"
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
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
          <h1 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Question Editor</h1>
          <MDEditor
            value={editorValue}
            onChange={setEditorValue}
            className="w-full border border-gray-200 rounded-md overflow-hidden"
          />
        </div>
      </div>

      {/* User-Interface Testing Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">User-Interface Testing</h2>
        <div className="space-y-6">
          {/* Page Name Input */}
          <div className="bg-gray-50 p-4 rounded-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">Page Name</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={selectedPage}
                onChange={(e) => setSelectedPage(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
              <button
                onClick={addPage}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 shadow-sm"
              >
                Add Page
              </button>
            </div>
          </div>

          {/* Select Page */}
          <div className="bg-gray-50 p-4 rounded-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Page</label>
            <select
              value={selectedPage}
              onChange={(e) => setSelectedPage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            >
              <option value="">Select Page</option>
              {pages.map((page) => (
                <option key={page.name} value={page.name}>{page.name}</option>
              ))}
            </select>
          </div>

          {/* Select Element */}
          <div className="bg-gray-50 p-4 rounded-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Element</label>
            <select
              value={selectedElement}
              onChange={(e) => setSelectedElement(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            >
              <option value="">Select Element</option>
              {HTML_ELEMENTS.map((element) => (
                <option key={element} value={element}>{element}</option>
              ))}
            </select>
          </div>

          {/* Select Attributes */}
          {selectedElement && (
            <div className="bg-gray-50 p-4 rounded-md">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Attributes</label>
              <div className="grid grid-cols-2 gap-4">
                {HTML_ATTRIBUTES[selectedElement].map((attribute) => (
                  <div key={attribute} className="mb-2 bg-white p-3 rounded-md shadow-sm border border-gray-100">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={attribute}
                        name={attribute}
                        checked={selectedAttributes[attribute]}
                        onChange={(e) => handleCheckboxChange(attribute, e.target.checked)}
                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                      />
                      <label htmlFor={attribute} className="text-sm font-medium text-gray-700">{attribute}</label>
                    </div>
                    {selectedAttributes[attribute] && (
                      <input
                        type="text"
                        placeholder={`Enter value for ${attribute}`}
                        value={attributeValues[attribute] || ''}
                        onChange={(e) => handleAttributeValueChange(attribute, e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Element Value Input */}
          <div className="bg-gray-50 p-4 rounded-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">Element Value</label>
            <input
              type="text"
              value={elementValue}
              onChange={(e) => setElementValue(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>

          {/* Add Element Button */}
          <button
            onClick={addElement}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300 shadow-sm"
          >
            Add Element
          </button>

          {/* Created Testcase Table */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Created Testcase</h2>
            <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="border-b border-gray-300 p-3 text-left font-semibold text-gray-700">Page Name</th>
                    <th className="border-b border-gray-300 p-3 text-left font-semibold text-gray-700">Element</th>
                    <th className="border-b border-gray-300 p-3 text-left font-semibold text-gray-700">Value</th>
                    <th className="border-b border-gray-300 p-3 text-left font-semibold text-gray-700">Attributes</th>
                  </tr>
                </thead>
                <tbody>
                  {pages.map((page) =>
                    page.elements.map((element, index) => (
                      <tr key={`${page.name}-${index}`} className="hover:bg-gray-50 border-b border-gray-200">
                        <td className="p-3 text-gray-800 font-medium">{page.name}</td>
                        <td className="p-3">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{element.tagName}</span>
                        </td>
                        <td className="p-3">{element.value}</td>
                        <td className="p-3">
                          {element.attributes.map((attr, attrIndex) => (
                            <div key={attrIndex} className="mb-1">
                              <span className="font-medium text-gray-700">{attr.name}:</span> {attr.value}
                            </div>
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
      </div>

      {/* Create Question Button */}
      <button
        type="submit"
        onClick={handlesubmitquestion}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 shadow-lg float-right"
      >
        Create Question
      </button>
    </div>
  );
}