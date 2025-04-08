import { Code } from 'lucide-react';
import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
// import CodeEditorII from './CodeEditorII';
// import App from './App';
// import AppII from './App';

const ScriptOutputPage = () => {
    const [clientIp, setClientIp] = useState('');
    const [showModal, setShowModal] = useState(true);
    const [inputIp, setInputIp] = useState('');
    const [activeTab, setActiveTab] = useState('windows');
    const [notificationVisible, setNotificationVisible] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        setClientIp(inputIp);
        setShowModal(false);
    };

    const renderInstructions = () => {
        switch (activeTab) {
            case 'windows':
                return (
                    <div className="mt-4 text-sm">
                        <ol className="list-decimal pl-5 space-y-2">
                            <li>Press <strong>Windows + R</strong> to open the Run dialog</li>
                            <li>Type <code className="bg-gray-100 px-1 rounded">cmd</code> and press Enter</li>
                            <li>In the command prompt, type <code className="bg-gray-100 px-1 rounded">ipconfig</code> and press Enter</li>
                            <li>Look for the <strong>IPv4 Address</strong> under your active network adapter (typically "Ethernet adapter" or "Wireless LAN adapter")</li>
                            <li>The IP address will look like: 192.168.x.x</li>
                        </ol>
                    </div>
                );
            case 'mac':
                return (
                    <div className="mt-4 text-sm">
                        <ol className="list-decimal pl-5 space-y-2">
                            <li>Click the Apple menu (🍎) and select "System Preferences"</li>
                            <li>Click on "Network"</li>
                            <li>Select your active connection (Wi-Fi or Ethernet) from the left sidebar</li>
                            <li>Your IP address will be displayed on the right side</li>
                            <li>Alternatively, open Terminal and type: <code className="bg-gray-100 px-1 rounded">ifconfig | grep "inet " | grep -v 127.0.0.1</code></li>
                        </ol>
                    </div>
                );
            case 'linux':
                return (
                    <div className="mt-4 text-sm">
                        <ol className="list-decimal pl-5 space-y-2">
                            <li>Open Terminal</li>
                            <li>Type one of these commands:
                                <ul className="list-disc pl-5 mt-1">
                                    <li><code className="bg-gray-100 px-1 rounded">hostname -I</code></li>
                                    <li><code className="bg-gray-100 px-1 rounded">ip addr show | grep "inet " | grep -v 127.0.0.1</code></li>
                                    <li><code className="bg-gray-100 px-1 rounded">ifconfig | grep "inet " | grep -v 127.0.0.1</code></li>
                                </ul>
                            </li>
                            <li>The first IP address (like 192.168.x.x) is typically your local IPv4 address</li>
                        </ol>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="relative">
            {/* {showModal && (
                <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Enter Your Local IPv4 Address</h2>
                        
                        <p className="mb-4 text-sm">
                            To connect to your local service, we need your computer's local IPv4 address.
                            Please follow the instructions for your operating system to find it.
                        </p>
                        
                        <div className="flex border-b mb-4">
                            <button 
                                className={`py-2 px-4 ${activeTab === 'windows' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                                onClick={() => setActiveTab('windows')}
                            >
                                Windows
                            </button>
                            <button 
                                className={`py-2 px-4 ${activeTab === 'mac' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                                onClick={() => setActiveTab('mac')}
                            >
                                Mac
                            </button>
                            <button 
                                className={`py-2 px-4 ${activeTab === 'linux' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                                onClick={() => setActiveTab('linux')}
                            >
                                Linux
                            </button>
                        </div>
                        
                        {renderInstructions()}
                        
                        <form onSubmit={handleSubmit} className="mt-6">
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1" htmlFor="ipAddress">
                                    Local IPv4 Address:
                                </label>
                                <input
                                    type="text"
                                    id="ipAddress"
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g., 192.168.1.5"
                                    pattern="^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$"
                                    title="Please enter a valid IPv4 address (e.g., 192.168.1.5)"
                                    value={inputIp}
                                    onChange={(e) => setInputIp(e.target.value)}
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Format: 192.168.x.x or 10.x.x.x
                                </p>
                            </div>
                            
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                                >
                                    Connect
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )} */}

            {(
                <div className="">
                    {clientIp && notificationVisible && (
                    <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-4 flex justify-between items-center">
                        <div>
                            <p className="font-medium">Connected to: {clientIp}:8081</p>
                            <p className="text-sm text-gray-600">If the iframe below doesn't load correctly, check that the service is running on this address</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button 
                            onClick={() => setShowModal(true)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                            >
                            Change IP
                            </button>
                            <button 
                            onClick={() => setNotificationVisible(false)}
                            className="text-gray-500 hover:text-gray-700"
                            aria-label="Close"
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            </button>
                        </div>
                    </div>
                    )}
                    {/* <iframe 
                        src={`http://${clientIp}:8081/?folder=/home/coder/project`} 
                        width="100%" 
                        height="700"
                        title="Script Output" 
                        allow="geolocation;microphone;camera"
                        className=""
                    ></iframe> */}
                    <div className=''>
                        <CodeEditor />
                        {/* <AppII /> */}
                        {/* <CodeEditorII /> */}
                    </div>
                    
                </div>
            )}
        </div>
    );
};

export default ScriptOutputPage;


// import React, { useEffect, useState } from 'react';

// const ScriptOutputPage = () => {
//     const [clientIp, setClientIp] = useState('');

//     useEffect(() => {
//         fetch('http://192.168.252.230:5001/api/get-ip')
//             .then(response => response.text()) // Expecting plain text response
//             .then(ip => {
//                 const trimmedIp = ip.replace(/^::ffff:/, '').trim(); // Remove IPv6 prefix if present
//                 setClientIp(trimmedIp);
//             })
//             .catch(error => console.error('Error fetching IP:', error));     
//     }, []);

//     return (
//         <div>
//             {clientIp && (
//                 <iframe 
//                     src={`http://${clientIp}:8081/?folder=/home/coder/project`} 
//                     width="100%" 
//                     height="600px" 
//                     title="Script Output" 
//                     allow='geolocation;microphone;camera'>
//                 </iframe>
//             )}
//         </div>
//     );
// };
// export default ScriptOutputPage


// import React, { useEffect, useState } from 'react';

// const ScriptOutputPage = () => {
//     const [serviceUrl, setServiceUrl] = useState('');
//     const [searching, setSearching] = useState(true);
//     const [progress, setProgress] = useState(0);

//     useEffect(() => {
//         // Try to detect if we're on the same machine first
//         const checkLocalhost = async () => {
//             try {
//                 const response = await fetch('http://localhost:8081/ping', {
//                     mode: 'no-cors',
//                     signal: AbortSignal.timeout(1000)
//                 });
//                 return true;
//             } catch (error) {
//                 return false;
//             }
//         };

//         // Check common local IP patterns
//         const checkCommonIps = async () => {
//             // Most common local IPs to try
//             const commonIps = [
//                 'localhost',
//                 '127.0.0.1',
//                 // Your specific network pattern
//                 '192.168.234.247'
//             ];

//             // Try specified address first since you mentioned it
//             for (const ip of commonIps) {
//                 try {
//                     const testUrl = `http://${ip}:8081`;
//                     const response = await fetch(`${testUrl}/ping`, {
//                         mode: 'no-cors',
//                         signal: AbortSignal.timeout(1000)
//                     });
                    
//                     // If we get here, the connection didn't throw an error
//                     console.log(`Service found at ${testUrl}`);
//                     return testUrl;
//                 } catch (error) {
//                     console.log(`No service at ${ip}:8081`);
//                 }
//             }
//             return null;
//         };

//         // Try to find the service through network scanning
//         const scanNetwork = async () => {
//             // Try common addresses first
//             try {
//                 const isLocalhost = await checkLocalhost();
//                 if (isLocalhost) {
//                     setServiceUrl('http://localhost:8081');
//                     setSearching(false);
//                     return;
//                 }

//                 const commonUrl = await checkCommonIps();
//                 if (commonUrl) {
//                     setServiceUrl(commonUrl);
//                     setSearching(false);
//                     return;
//                 }

//                 // If common addresses failed, try a range scan
//                 // Base IP for your network
//                 const baseIp = '192.168.234';
//                 const startRange = 1;
//                 const endRange = 254;
//                 const totalIps = endRange - startRange + 1;
                
//                 for (let i = startRange; i <= endRange; i++) {
//                     const ip = `${baseIp}.${i}`;
//                     setProgress(Math.floor(((i - startRange) / totalIps) * 100));
                    
//                     try {
//                         const testUrl = `http://${ip}:8081`;
//                         await fetch(`${testUrl}/ping`, {
//                             mode: 'no-cors',
//                             signal: AbortSignal.timeout(300) // Short timeout for faster scanning
//                         });
                        
//                         // Connection succeeded
//                         setServiceUrl(testUrl);
//                         setSearching(false);
//                         return;
//                     } catch (error) {
//                         // This IP doesn't work, continue scanning
//                     }
//                 }
                
//                 // If we get here, we couldn't find the service
//                 setSearching(false);
//             } catch (error) {
//                 console.error("Error during service discovery:", error);
//                 setSearching(false);
//             }
//         };

//         scanNetwork();
//     }, []);

//     if (searching) {
//         return (
//             <div>
//                 <div>Searching for your service on the network...</div>
//                 {progress > 0 && <div>Progress: {progress}%</div>}
//             </div>
//         );
//     }

//     return (
//         <div>
//             {serviceUrl ? (
//                 <>
//                     <div>Service found at: {serviceUrl}</div>
//                     <iframe 
//                         src={`${serviceUrl}/?folder=/home/coder/project`} 
//                         width="100%" 
//                         height="600px" 
//                         title="Script Output" 
//                         allow='geolocation;microphone;camera'>
//                     </iframe>
//                 </>
//             ) : (
//                 <div>
//                     <p>Could not discover your service on the network.</p>
//                     <p>Please enter the IP address manually:</p>
//                     <input 
//                         type="text" 
//                         placeholder="192.168.x.x" 
//                         onChange={(e) => setServiceUrl(`http://${e.target.value}:8081`)}
//                     />
//                     {serviceUrl && (
//                         <button onClick={() => window.location.reload()}>
//                             Connect
//                         </button>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ScriptOutputPage;

// import React, { useEffect, useState } from 'react';

// const ScriptOutputPage = () => {
//     const [clientIp, setClientIp] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         // Using a public IP address API service
//         fetch('https://api.ipify.org?format=json')
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 const ip = data.ip;
//                 console.log('Fetched IP:', ip);
//                 const trimmedIp = ip.replace(/^::ffff:/, '').trim(); // Remove IPv6 prefix if present

//                 setClientIp(trimmedIp);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error('Error fetching IP:', error);
//                 setError('Failed to fetch IP address');
//                 setLoading(false);
//             });
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>{error}</div>;
//     }

//     return (
//         <div>
//             {clientIp && (
//                 <>
//                     <div>Your IP: {clientIp}</div>
//                     <iframe 
//                         src={`http://${clientIp}:8081/?folder=/home/coder/project`} 
//                         width="100%" 
//                         height="600px" 
//                         title="Script Output" 
//                         allow='geolocation;microphone;camera'>
//                     </iframe>
//                 </>
//             )}
//         </div>
//     );
// };

// export default ScriptOutputPage;
