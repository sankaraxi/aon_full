import React from 'react';
import { RxHamburgerMenu } from "react-icons/rx";

const Guidelines = () => {
  const steps = [
    {
      step: '01',
      title: 'Open Terminal',
      details: [
        'Open terminal using shortcut Ctrl + `',
        <>
        Select <span className='bg-gray-300 mx-1 font-semibold font-firacode px-1 rounded-md text-red-400'><RxHamburgerMenu className="inline-block mx-1 text-red-500" /> →  Terminal → New Terminal</span>  from the left top corner
      </>,
      ],
      image: '/guidelines_image1.png', // Replace with actual image paths
    },
    {
      step: '02',
      title: 'Install Dependencies',
      details: [<>Run <span className='bg-gray-300 mx-1 font-semibold font-firacode px-1 rounded-md text-red-400'>npm install</span> to install the necessary dependencies
      </>],
      image: '/guidelines_image2.png',
    },
    {
      step: '03',
      title: 'Launch Project',
      details: [<>Run <span className='bg-gray-300 mx-1 font-semibold font-firacode px-1 rounded-md text-red-400'>npm run dev</span> to run the project</>,],
      image: '/guidelines_image3.png',
    },
    {
      step: '04',
      title: 'View your Output',
      details: [<>Open new tab in your browser and navigate to <span className='bg-gray-300 mx-1 font-semibold font-firacode px-1 rounded-md text-red-400'>http://localhost/</span> to view your output</>],
      image: '/guidelines_image6.png',
    },
    {
      step: '05',
      title: 'Add Your Code',
      details: [<>Navigate to the <span className='bg-gray-300 mx-1 font-semibold font-firacode px-1 rounded-md text-red-400'>dashboard.css</span> component to add your code</>],
      image: '/guidelines_image4.png',
    },
    {
      step: '06',
      title: 'Submit Assignment',
      details: [<>Submit the assignment by clicking <span className='bg-gray-300 mx-1 font-semibold font-firacode px-1 rounded-md text-red-400'>Submit Assignment</span> button once you finished coding</>],
      image: '/guidelines_image5.png',
    }, 
    
  ];

  return (
    <div className="max-w-4xl pl-4 pt-4 bg-white shadow-md rounded-lg">
      <header className="mb-8 pb-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-medium text-gray-800">Project Setup Guidelines</h2>
          <p className="text-sm text-gray-500 mt-1">Follow these steps to set up your development environment</p>
        </div>
      </header>

      <ol className="space-y-10">
        {steps.map(({ step, title, details, image }, index) => (
          <li key={index} className="flex gap-6 pb-8">
            <div className="flex md:flex-col">
              <div className="mr-4 md:mr-0 md:mb-4">
                <div className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-full text-sm font-medium text-gray-600">
                  {step}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block w-px h-full bg-gray-200 ml-4"></div>
              )}
            </div>
            
            <div className="flex-1 flex flex-col gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-800 mb-2">{title}</h3>
                <ul className="space-y-1 text-gray-600 text-sm">
                  {details.map((item, i) => (
                    <li key={i} className="flex items-baseline">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400 mr-2.5 flex-shrink-0 mt-1.5"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full h-75 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                <img 
                  src={image} 
                  alt={`Step ${step}: ${title}`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/192x128?text=Step+' + step;
                  }}
                />
              </div>
            </div>
          </li>
        ))}
      </ol>
      
      <div className="mt-10 pt-6 border-t border-gray-200 flex justify-end">
        <button className="px-6 py-2 bg-gray-800 text-white text-sm font-medium rounded hover:bg-gray-700 transition-colors">
          Begin Setup
        </button>
      </div>
    </div>
  );
};

export default Guidelines;