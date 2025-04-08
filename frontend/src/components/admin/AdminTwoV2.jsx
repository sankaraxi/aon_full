import React from 'react'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { FaDownload } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const AdminTwo = () => {
    const [searchTerm, setSearchTerm] = useState('');
      const [currentPage, setCurrentPage] = useState(1);
      const [pageNumberInput, setPageNumberInput] = useState('');
      const itemsPerPage = 10;
      const [data, setData] = useState([]);
      const [topLimit, setTopLimit] = useState(68);


    const handleDownloadII = (id) => {
      console.log(id);
        const link = document.createElement('a');
        link.href = `/my-report-${id}.pdf`;
        link.download = `/my-report-${id}.pdf`;
        link.click();
      };
      const handleDownload = () => {
        const link = document.createElement('a');
        link.href = `/report_cs_mern_2024.csv`;
        link.download = `report_cs_mern_2024.csv`;
        link.click();
      };

      useEffect(() => {
          fetch('/Report2025.json')
            .then((response) => {
              if (!response.ok) {
                throw new Error('Failed to fetch data');
              }
              return response.json();
            })
            .then((jsonData) => {
              const formattedData = jsonData.map(({ STUDENT_NAME, PHONE_NUMBER, EMAIL_ID, TEST_NAME, PERFORMANCE_SCORE, RESPONSIVE_SCORE, FUNCTIONAL_SCORE, OVERALL_SCORE, Rank }) => ({
                name: STUDENT_NAME,
                phone: PHONE_NUMBER,
                email: EMAIL_ID,
                test: TEST_NAME,
                performance: PERFORMANCE_SCORE,
                responsive: RESPONSIVE_SCORE,
                functional: FUNCTIONAL_SCORE,
                overall: OVERALL_SCORE,
                rank: Rank // Use the Rank field from the JSON data
              }));
              setData(formattedData);
            })
            .catch((error) => console.error('Error:', error));
        }, []);
      
        const filteredPerformers = data
          .filter(performer =>
            performer?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            performer?.email?.toLowerCase()?.includes(searchTerm.toLowerCase())
          );
      
        const limitedPerformers = topLimit ? filteredPerformers.slice(0, topLimit) : filteredPerformers;
      
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = limitedPerformers.slice(indexOfFirstItem, indexOfLastItem);
        const totalPages = Math.ceil(limitedPerformers.length / itemsPerPage);
      
        const nextPage = () => {
          if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
          }
        };
      
        const prevPage = () => {
          if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
        };
      
        const goToPage = () => {
          const pageNumber = parseInt(pageNumberInput);
          if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
          }
        };
      
        const isDateBeforeToday = (dateString) => {
          // Parse date string format DD/MM/YYYY
          const [day, month, year] = dateString.split('/').map(Number);
          const reportDate = new Date(year, month - 1, day); // month is 0-indexed in JS Date
          const today = new Date();
          
          // Reset time part for accurate date comparison
          today.setHours(0, 0, 0, 0);
          reportDate.setHours(0, 0, 0, 0);
          
          return reportDate < today;
        };
      
        // Reset currentPage to 1 whenever topLimit changes
        useEffect(() => {
          setCurrentPage(1);
        }, [topLimit]);
  return (
    <div className='px-12 py-7'>
        <div className="mt-10 relative">
        <div className="absolute top-0 right-0">
            <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
            >
            <FaDownload /> Download Report
            </button>
        </div>
            <h2 className="text-xl font-bold mb-4 text-center">Performers</h2>
            
            {/* Search Bar */}
            <div className="flex justify-center mb-6">
              <input
                type="text"
                placeholder="Search by name , roll number or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
    
            <div className="flex justify-center items-center gap-4 mb-4">
              <button 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg shadow-md cursor-pointer hover:from-blue-700 hover:to-indigo-700 transition-all duration-300" 
                onClick={() => setTopLimit(10)}
              >
                Top 10
              </button>
              <button 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg shadow-md cursor-pointer hover:from-blue-700 hover:to-indigo-700 transition-all duration-300" 
                onClick={() => setTopLimit(20)}
              >
                Top 20
              </button>
              {/* <button 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg shadow-md cursor-pointer hover:from-blue-700 hover:to-indigo-700 transition-all duration-300" 
                onClick={() => setTopLimit(100)}
              >
                Top 100
              </button> */}
              <button 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg shadow-md cursor-pointer hover:from-blue-700 hover:to-indigo-700 transition-all duration-300" 
                onClick={() => setTopLimit(68)}
              >
                All Performers
              </button>
            </div>
            <div className="flex justify-center items-center gap-4 mb-4">
              <MdNavigateBefore className="text-3xl cursor-pointer text-blue-500 select-none" onClick={prevPage} />
              <span className="text-lg font-bold text-blue-500 select-none">Page {currentPage} of {totalPages}</span>
              <MdNavigateNext className="text-3xl cursor-pointer text-blue-500 select-none" onClick={nextPage} />
              <input
                type="number"
                placeholder={`Page 1 to ${totalPages}`}
                value={pageNumberInput}
                onChange={(e) => setPageNumberInput(e.target.value)}
                className="w-38 px-4 py-1 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded-sm shadow-md cursor-pointer hover:bg-blue-600 transition-all duration-300"
                onClick={goToPage}
              >
                Go
              </button>
            </div>
    
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">Phone</th>
                    <th className="border border-gray-300 px-4 py-2">Email</th>
                    <th className="border border-gray-300 px-4 py-2">Test Name</th>
                    <th className="border border-gray-300 px-4 py-2">Performance Score</th>
                    <th className="border border-gray-300 px-4 py-2">Responsive Score</th>
                    <th className="border border-gray-300 px-4 py-2">Functional Score</th>
                    <th className="border border-gray-300 px-4 py-2">Overall Score</th>
                    <th className="border border-gray-300 px-4 py-2">Rank</th>
                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item) => (
                    <tr key={item.email} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                      <td className="border border-gray-300 px-4 py-2">{item.phone}</td>
                      <td className="border border-gray-300 px-4 py-2">{item.email}</td>
                      <td className="border border-gray-300 px-4 py-2">{item.test}</td>
                      <td className="border border-gray-300 px-4 py-2">{Number(item.performance).toFixed(2)}</td>
                      <td className="border border-gray-300 px-4 py-2">{item.responsive}</td>
                      <td className="border border-gray-300 px-4 py-2">{item.functional}</td>
                      <td className="border border-gray-300 px-4 py-2">{Number(item.overall).toFixed(2)}</td>
                      <td className="border border-gray-300 px-4 py-2">{item.rank}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <button className="bg-blue-500 text-white px-4 py-1 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300" onClick={() => handleDownloadII(item.rank)}>View</button>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
    </div>
    </div>
    
  )
}

export default AdminTwo