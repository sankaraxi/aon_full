import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function User() {
    var { id } = useParams();
    const [testdata, setTestdata] = useState([]);
    const [htmlContent, setHtmlContent] = useState('');
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [timeLeft, setTimeLeft] = useState(6);
    const [showTable, setShowTable] = useState(false);
    const [question, setQuestion] = useState("");

    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // },[])

    useEffect(() => {

        fetch("http://192.168.252.230:5001/api/getquestionbyid")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Question not found");
                }
                console.log(response);
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setQuestion(data.question);
            })
            .catch((err) => {
                setError(err.message);
            });
        
        fetch("http://192.168.252.230:5001/api/getquestion")
            .then(res => res.json())
            .then((data) => {
                setHtmlContent(data[0].context);
            });

        if (timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);

            return () => clearTimeout(timer);
        } else {
            setIsButtonEnabled(true);
        }
    }, [timeLeft]);

    const toggleTable = () => {
        setShowTable(!showTable);
    };

    // const runScript = async () => {
    //     try {
    //         const response = await fetch('http://192.168.252.230:5001/api/run-script', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         const data = await response.json();
    //         console.log('Script output:', data);
    //         window.location.href = `/workspace/${id}`;
    //     } catch (error) {
    //         console.error('Error running script:', error);
    //     }
    // };

    const handleStartAssessment = async () => {
        try {
          const res = await fetch('http://192.168.252.230:5001/api/run-script', { method: 'POST' });
          const data = await res.json();
          console.log('Script output:', data.stdout);
          alert('Assessment started!');
        } catch (err) {
          console.error(err);
          alert('Something went wrong xstarting the assessment.');
        }
      };


    return (
        <>
            <div className="w-full p-5">
                <div className="p-5 mb-2">
                    {/* <div className="w-full" dangerouslySetInnerHTML={{__html: question}}></div> */}

                    <div className="w-full" >
                        {/* <div className="shadow-md p-7 md:mx-20 my-2">
                            <h1 className="text-center text-2xl font-bold">CRM Application Project Description</h1>

                            <section className="mt-4">
                                <h2 className="text-xl font-semibold">Objective</h2>
                                <p>Develop a CRM application using the MERN stack. The application will include role-based login functionality for Admin, Manager, BDM (Business Development Manager), and BDE (Business Development Executive). Each user will register with a company domain email, and reporting persons will be dynamically loaded from the database.</p>
                            </section>

                            <section className="mt-4">
                                <h2 className="text-xl font-semibold">Requirements</h2>
                                <h3 className="text-lg font-medium">User Roles:</h3>
                                <ul className="list-disc pl-5">
                                    <li><strong>Admin:</strong>
                                        <ul className="list-disc pl-5">
                                            <li>Can add users belonging to the Manager, BDM, and BDE roles.</li>
                                            <li>Cannot add other Admins.</li>
                                        </ul>
                                    </li>
                                    <li><strong>Manager, BDM, BDE:</strong>
                                        <ul className="list-disc pl-5">
                                            <li>Can register with a company domain email (e.g., manager@abccollege.com).</li>
                                            <li>Cannot register with generic email providers (e.g., manager@gmail.com).</li>
                                        </ul>
                                    </li>
                                </ul>
                            </section>

                            <section className="mt-4">
                                <h2 className="text-xl font-semibold">Functional Requirements</h2>
                                <h3 className="text-lg font-medium">User Registration:</h3>
                                <ul className="list-disc pl-5">
                                    <li>Users must register with a company domain email address.</li>
                                    <li>Validation to ensure the email is not from a generic email provider.</li>
                                    <li>Form submission should save user details to the MySQL database.</li>
                                </ul>

                                <h3 className="text-lg font-medium">Login Functionality:</h3>
                                <ul className="list-disc pl-5">
                                    <li>Users can log in with their email and password.</li>
                                    <li>Access should be restricted based on roles (e.g., only Admin can add users).</li>
                                </ul>

                                <h3 className="text-lg font-medium">Dynamic Dropdown Data:</h3>
                                <ul className="list-disc pl-5">
                                    <li>The Reporting Person and Role dropdowns should load data dynamically from the database.</li>
                                </ul>
                            </section>

                            <section className="mt-4">
                                <h2 className="text-xl font-semibold">Technical Specifications</h2>
                                <h3 className="text-lg font-medium">Frontend:</h3>
                                <ul className="list-disc pl-5">
                                    <li><strong>React.js:</strong> For building the user interface.</li>
                                    <li><strong>React Router:</strong> For handling routing between different pages (e.g., login, registration, dashboard).</li>
                                    <li><strong>Form Validation:</strong> Implement form validation to ensure correct data input.</li>
                                </ul>

                                <h3 className="text-lg font-medium">Backend:</h3>
                                <ul className="list-disc pl-5">
                                    <li><strong>Node.js:</strong> For server-side operations.</li>
                                    <li><strong>Express.js:</strong> For building the REST API.</li>
                                    <li><strong>MySQL:</strong> For the database to store user details and roles.</li>
                                    <li><strong>JWT (JSON Web Tokens):</strong> For handling authentication and authorization.</li>
                                </ul>
                            </section>

                            <section className="mt-4">
                                <h2 className="text-xl font-semibold">Evaluation Criteria</h2>
                                <ul className="list-disc pl-5">
                                    <li>Performance Testing</li>
                                    <li>Page Load Time</li>
                                    <li>Page Responsiveness</li>
                                    <li>Registration with Gmail ID</li>
                                    <li>Admin Registration within Admin Login</li>
                                    <li>Registration with Company ID</li>
                                </ul>
                            </section>
                        </div> */}
                        <div className="shadow-md p-7 md:mx-20 my-2" dangerouslySetInnerHTML={{__html: question}}></div>
                        <div className="md:mx-20 md:flex justify-center md:justify-between items-center">    
                            {/* <Link to={`/workspace/${id}`}><button  className={`bg-blue-500 text-white px-4 py-2 rounded-md lg:float-right mt-4 ${isButtonEnabled ? "cursor-pointer" : "cursor-not-allowed"}`} disabled={!isButtonEnabled}>Start Assessment</button></Link> */}
                            <button onClick={handleStartAssessment} className="">Start Assessment</button>
                        </div>
                       
                    </div>
                </div>
            </div>
        </>
    );
}