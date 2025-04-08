import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Addcategory() {
  const [displaycategory, setdisplaycategory] = useState([]);
  
  function handleadd(event) {
    event.preventDefault();
    var selectcategory = document.getElementById("selectcategory").value;
    var getcategory = document.getElementById("getcategory").value;
    var category = {
      getcategory: getcategory
    };
    var subcategory = {
      selectcategory: selectcategory,
      getcategory: getcategory
    };
    
    if (selectcategory === "") {
      axios.post("http://192.168.252.230:5001/api/addcategory", category)
        .then((res) => {
          if (res.data.status === "inserted") {
            alert("category is created");
            window.location.reload();
          } else {
            alert("category is not created");
          }
        });
    } else {
      if (getcategory === "") {
        alert("Please enter the category");
      } else {
        axios.post("http://192.168.252.230:5001/api/subcategory", subcategory)
          .then((res) => {
            if (res.data.status === "inserted") {
              alert("sub-category is created");
              window.location.reload();
            } else {
              alert("sub-category is not created");
            }
          });
      }
    }
  }
  
  useEffect(() => {
    fetch("http://192.168.252.230:5001/api/getcategory")
      .then(res => res.json())
      .then(data => setdisplaycategory(data));
  }, []);
  
  return (
    <>
      <div className="flex justify-around">
        <h1 
          className="mb-0 bg-blue-600 text-white font-bold py-2 px-4 rounded mt-3 cursor-pointer"
          data-bs-toggle="modal" 
          data-bs-target="#exampleModalca"
        >
          Add Category
        </h1>
      </div>
      
      <div className="modal fade" id="exampleModalca" tabIndex="1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h5 className="text-xl font-medium" id="exampleModalLabel">Add Category</h5>
              <button type="button" className="text-gray-400 hover:text-gray-500" data-bs-dismiss="modal" aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-5">
              <p className="mb-4">Add your quiz Category</p>
              <div>
                <form onSubmit={handleadd}>
                  <select 
                    className="block w-full p-3 mb-3 text-lg bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="selectcategory"
                  >
                    <option value="">Open this select menu</option>
                    {
                      displaycategory.map((value, index) => (
                        <option key={index} value={value.category_name}>{value.category_name}</option>
                      ))
                    }
                  </select>
                  <div className="mb-3">
                    <input 
                      type="text" 
                      className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      id="getcategory" 
                      placeholder="Enter the Category or sub-Category"
                    />
                  </div>
                  <input 
                    type="submit" 
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer" 
                    value="ADD"
                  /> 
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}