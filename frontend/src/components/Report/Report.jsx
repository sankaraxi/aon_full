import React, { useEffect, useState } from "react";
// import report from '../Assest/report.jpeg';
// import './report.css';

export default function Reportfile() {
    const [report, setReport] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5173/responsive_test_results.json")
            .then(res => res.json())
            .then(data => setReport(data));
    }, []); // Added empty dependency array to run only once

    const mobileIcon = '📱';
    const tabletIcon = '📲';
    const laptopIcon = '💻';
    const tickIcon = '✔️';

    const getDeviceType = (width) => {
        if (width === 320) return mobileIcon;
        if (width === 768) return tabletIcon;
        if (width === 1440) return laptopIcon;
        return null;
    };

    const ResponsiveReport = () => {
        return (
            <div className="container mx-auto px-32 py-8">
                <h1 className="text-3xl font-bold text-center mb-8">Responsive Test Report</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {report.map((entry, index) => {
                        const { width, height } = entry.viewport || {};
                        const isResponsive = entry.isResponsive;

                        const deviceIcon = getDeviceType(width);
                        if (!deviceIcon) return null;

                        return (
                            <div key={index} className="bg-white shadow-lg rounded-lg p-6">
                                <h2 className="text-xl font-semibold flex items-center">
                                    <span className="mr-2">{deviceIcon}</span>
                                    Device (Width: {width})
                                </h2>
                                <p className="mt-2"><strong>Viewport Size:</strong> {width}x{height}</p>
                                <p className="mt-2">
                                    <strong>Responsive:</strong> {isResponsive ? tickIcon : '✖️'}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <>
            <ResponsiveReport />
        </>
    );
}