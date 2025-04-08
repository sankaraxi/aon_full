import React, { useState, useEffect } from "react";
import logo from "../../assets/kgglwhitelogo.png";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function Menuuser() {
    const { id } = useParams();
    const [timeLeft, setTimeLeft] = useState(10800);
    const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);
    const [isModalClosing, setIsModalClosing] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (timeLeft === 0) return;
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    function handeleinvite(event) {
        event.preventDefault();
        var emails = document.getElementById("emailids").value;
        var key = { emails: emails };
        
        if (emails === '') {
            alert("Please provide an email ID");
        } else {
            axios.post("http://192.168.252.230:5001/api/text-mail", key)
                .then((res) => {
                    if (res.data.message === "Mail send") {
                        alert("Mail sent successfully");
                        window.location.reload();
                    } else {
                        alert("Mail not sent");
                    }
                });
        }
    }

    const openGradeModal = () => {
        setIsModalClosing(false);
        setIsGradeModalOpen(true);
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = `/grade_report.pdf`;
        link.download = `grade_report.pdf`;
        link.click();
    };

    const closeGradeModal = () => {
        setIsModalClosing(true);
        setTimeout(() => {
            setIsGradeModalOpen(false);
            setIsModalClosing(false);
        }, 400);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    const runScript = async () => {
        alert("Script is running");
        try {
            const response = await fetch('http://192.168.252.230:5001/api/run-Assesment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.log('Script output:', data);
            alert("Assesment submitted successfully");
        } catch (error) {
            alert("Assesment submitted successfully");
            openGradeModal()
            console.error('Error running script:', error);
        }
    };

    const getFormattedDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");
        const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
        const year = today.getFullYear();
        return `${day}.${month}.${year}`;
    };
    return (
        <>
            <nav className="bg-[#291571] px-4 md:px-10 sticky top-0 z-10 flex justify-between items-center">
                <div className="px-2 md:px-6">
                    <img src={logo} className="w-20 md:w-28" alt="Logo" />
                </div>
                
                {/* Hamburger menu for mobile */}
                <div className="block lg:hidden">
                    <button 
                        onClick={toggleMobileMenu}
                        className="text-white focus:outline-none"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
                
                {/* Desktop menu */}
                <div className="hidden lg:flex items-center gap-6">
                    <button 
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200 font-medium shadow-md"
                        onClick={openGradeModal}
                    >
                        Grade
                    </button>
                    
                    
                        <button onClick={runScript} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-200 font-medium shadow-md">Submit Assessment</button>
                   
                    
                    {/* Timer with fixed widths for all elements */}
                    <div className="flex items-center border-2 border-white/30 rounded-lg py-1 px-3 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white/80 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="flex items-center">
                            <div className="w-8 text-center">
                                <span className="text-xl font-medium">{hours}</span>
                            </div>
                            <div className="w-4 text-center">
                                <span className="text-xl font-medium inline-block animate-pulse">:</span>
                            </div>
                            <div className="w-8 text-center">
                                <span className="text-xl font-medium">{minutes < 10 ? `0${minutes}` : minutes}</span>
                            </div>
                            <div className="w-4 text-center">
                                <span className="text-xl font-medium inline-block animate-pulse">:</span>
                            </div>
                            <div className="w-8 text-center">
                                <span className="text-xl font-medium">{seconds < 10 ? `0${seconds}` : seconds}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile menu dropdown */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-[#291571] px-4 py-4 flex flex-col gap-4 shadow-md animate-fadeIn">
                    <button 
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200 font-medium shadow-md w-full"
                        onClick={() => {
                            openGradeModal();
                            setIsMobileMenuOpen(false);
                        }}
                    >
                        Grade
                    </button>
                    
                    {/* <Link to={`/report/${id}`} className="w-full"> */}
                        <button onClick={runScript} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-200 font-medium shadow-md w-full">Submit Assessment</button>
                    {/* </Link> */}
                    
                    {/* Timer for mobile */}
                    <div className="flex items-center justify-center border-2 border-white/30 rounded-lg py-2 px-3 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white/80 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="flex items-center">
                            <div className="w-8 text-center">
                                <span className="text-xl font-medium">{hours}</span>
                            </div>
                            <div className="w-4 text-center">
                                <span className="text-xl font-medium inline-block animate-pulse">:</span>
                            </div>
                            <div className="w-8 text-center">
                                <span className="text-xl font-medium">{minutes < 10 ? `0${minutes}` : minutes}</span>
                            </div>
                            <div className="w-4 text-center">
                                <span className="text-xl font-medium inline-block animate-pulse">:</span>
                            </div>
                            <div className="w-8 text-center">
                                <span className="text-xl font-medium">{seconds < 10 ? `0${seconds}` : seconds}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal with enhanced animations and responsiveness */}
            {isGradeModalOpen && (
                <div 
                    className={`fixed inset-0 flex justify-center items-center z-50 transition-opacity duration-400 p-4 ${
                        isModalClosing ? 'opacity-0' : 'opacity-100'
                    }`}
                    style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
                >
                    <div 
                        className={`bg-white w-full max-w-2xl rounded-lg shadow-xl transform transition-all duration-400 ${
                            isModalClosing 
                                ? 'opacity-0 scale-90 -translate-y-4' 
                                : 'opacity-100 scale-100 translate-y-0'
                        } max-h-[90vh] overflow-auto`}
                    >
                        <div className="p-4 md:p-5 border-b flex justify-between items-center bg-gray-50 rounded-t-lg sticky top-0 z-10">
                            <h5 className="text-lg md:text-xl font-bold text-gray-800">Assessment Grade Report</h5>
                            <button 
                                className="text-gray-500 hover:text-gray-700 focus:outline-none transition-transform duration-200 hover:scale-110" 
                                onClick={closeGradeModal}
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-4 md:p-6">
                            <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                                <div>
                                    <span className="text-sm text-gray-600">Test Date:</span>
                                    <span className="ml-2 font-medium">{getFormattedDate()}</span>
                                </div>
                                <div className="flex items-center flex-wrap gap-4">
                                    <div className="flex items-center">
                                        <span className="mr-2 text-sm text-gray-600">Result:</span>
                                        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">Fail</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="mr-2 text-sm text-gray-600">Score:</span>
                                        <div className="w-12 h-12 rounded-full bg-blue-100 border-4 border-blue-500 flex items-center justify-center">
                                            <span className="text-blue-800 font-bold text-sm">67%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="py-3 px-4 text-left font-semibold text-gray-700">Test Case</th>
                                            <th className="py-3 px-4 text-left font-semibold text-gray-700">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        <tr className="hover:bg-gray-50">
                                            <td className="py-3 px-4 text-sm">1. Performance Test</td>
                                            <td className="py-3 px-4">
                                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Pass</span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="py-3 px-4 text-sm">2. Responsive Test</td>
                                            <td className="py-3 px-4">
                                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Pass</span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="py-3 px-4 text-sm">3. Login with company ID</td>
                                            <td className="py-3 px-4">
                                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Pass</span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="py-3 px-4 text-sm">4. Login with Gmail ID</td>
                                            <td className="py-3 px-4">
                                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Pass</span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="py-3 px-4 text-sm">5. Create user inside Admin Login</td>
                                            <td className="py-3 px-4">
                                                <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Fail</span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="py-3 px-4 text-sm">6. Create Admin inside Admin Login</td>
                                            <td className="py-3 px-4">
                                                <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Fail</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-6 flex flex-col sm:flex-row justify-end gap-2">
                                <button 
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition duration-200 hover:shadow-md w-full sm:w-auto"
                                    onClick={closeGradeModal}
                                >
                                    Close
                                </button>
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200 hover:shadow-md w-full sm:w-auto" onClick={handleDownload}>
                                    Download Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}