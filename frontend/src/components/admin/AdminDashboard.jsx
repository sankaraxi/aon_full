import { FaUsers, FaClipboardCheck, FaUserCheck, FaDownload } from 'react-icons/fa';
import { useState, useEffect, use } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ImSpinner2 } from 'react-icons/im';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDownload, setShowDownload] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumberInput, setPageNumberInput] = useState('');
  const itemsPerPage = 10;
  const [data, setData] = useState([]);
  const [topLimit, setTopLimit] = useState(null);
  const navigate = useNavigate();

  // Report generation data
  const reportData = [
    { 
      id: 1, 
      date: '30/10/2024', 
      testName: 'MERN Stack Test', 
      department: 'Computer Science', 
      maxScore: 100, 
      enrolled: 68, 
      attempted: 65
    },
    { 
      id: 2, 
      date: '12/11/2024', 
      testName: 'Frontend Test',
      department: 'Computer Science', 
      maxScore: 100, 
      enrolled: 72, 
      attempted: 69
    },
    { 
      id: 3, 
      date: '25/11/2024', 
      testName: 'Frontend Test', 
      department: 'Information Technology', 
      maxScore: 100, 
      enrolled: 65, 
      attempted: 61
    },
    { 
      id: 4, 
      date: '10/12/2024', 
      testName: 'MERN Stack Test', 
      department: 'Information Technology', 
      maxScore: 100, 
      enrolled: 70, 
      attempted: 67
    },
    {
      id: 5,
      date: '15/03/2025',
      testName: 'Frontend Test',
      department: 'Computer Technology',
      maxScore: 100,
      enrolled: 70,
      attempted: "-"
    },
    {
      id: 6,
      date: '30/03/2025',
      testName: 'MERN Stack Test',
      department: 'Computer Technology',
      maxScore: 100,
      enrolled: 63,
      attempted: "-"
    }
  ];

  const handleGenerateReport = (id) => {
    setShowDownload((prev) => ({ ...prev, [id]: false }));
    
    // Simulate loading for specific report
    setTimeout(() => {
      setShowDownload((prev) => ({ ...prev, [id]: true }));
    }, 2000);
  };

  const handleClick = (id) => {
    navigate(`/admin/view/${id}`);
  };

  const cards = [
    { title: 'Total License Purchased', count: 1000, icon: <FaUsers />, bgColor: 'bg-pink-500', users: "558", rem: "442" },
    { title: 'Total Invited', count: 530, icon: <FaUserCheck />, bgColor: 'bg-green-500' },
    { title: 'Total Users Attempted', count: 503, icon: <FaClipboardCheck />, bgColor: 'bg-blue-500' }
  ];

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
    <div className="p-10">
      <p className="text-xl font-bold mb-6">Hi Admin,</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div key={index} className={`bg-white shadow-lg rounded-lg p-[20px] border-t-4 ${card.bgColor}`}>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[25px] font-semibold text-gray-700">{card.title}</p>
                <p className="text-[30px] font-bold mt-2">{card.count}</p>
              </div>
              <div className={`${card.bgColor} text-4xl p-4 rounded-full`}>
                {card.icon}
              </div>
            </div>
            { 
              card.users && (
                <div className="mt-[5px] flex items-center gap-8">
                  <div>
                  <p className="text-sm text-gray-700">Used</p>
                  <p className="text-2xl font-bold mt-2">{card.users}</p>
                  </div>
                  <div>
                  <p className="text-sm text-gray-700">Remaining</p>
                  <p className="text-2xl font-bold mt-2">{card.rem}</p>
                  </div>
                  <div>
                    
                  </div>
                  <div className='ml-[40px]'>
                  <Link to='/purchase/license'>
                      <button
                      className="bg-blue-500 text-white text-sm py-1 px-3 rounded-lg shadow cursor-pointer hover:bg-blue-600 transition"
                      >
                      Add more Licenses
                      
                    </button>
                </Link>

                  </div>
                  
                </div>

              )
            }
          </div>
        ))}
      </div>
      
      {/* Report Generation Section */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4 text-center">Report Generation</h2>
        
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">S. No.</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Name of the Test</th>
                <th className="border border-gray-300 px-4 py-2">Department Name</th>
                <th className="border border-gray-300 px-4 py-2">Max. Score</th>
                <th className="border border-gray-300 px-4 py-2" colSpan="2">No. of Candidates</th>
                <th className="border border-gray-300 px-4 py-2">Report</th>
              </tr>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2"></th>
                <th className="border border-gray-300 px-4 py-2"></th>
                <th className="border border-gray-300 px-4 py-2"></th>
                <th className="border border-gray-300 px-4 py-2"></th>
                <th className="border border-gray-300 px-4 py-2"></th>
                <th className="border border-gray-300 px-4 py-2">Enrolled</th>
                <th className="border border-gray-300 px-4 py-2">Attempted</th>
                <th className="border border-gray-300 px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-center">{report.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{report.date}</td>
                  <td className="border border-gray-300 px-4 py-2">{report.testName}</td>
                  <td className="border border-gray-300 px-4 py-2">{report.department}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{report.maxScore}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{report.enrolled}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{report.attempted}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
  <div className="flex items-center justify-center gap-2">
    {
      isDateBeforeToday(report.date) ? (
        <button
          className="bg-blue-500 text-white text-sm py-1 px-3 rounded-md shadow cursor-pointer hover:bg-blue-600 transition"
          onClick={() => handleClick(report.id)}
        >
          View
        </button>
      ) : (
        <span className="text-gray-500 text-sm">Not available yet</span>
      )
    }
  </div>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;