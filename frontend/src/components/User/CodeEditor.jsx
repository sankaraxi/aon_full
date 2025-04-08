// import React, { useEffect, useRef } from 'react';

// export default function CodeEditor() {
//   const containerRef = useRef(null);
  
//   useEffect(() => {
//     // Ensure the iframe loads correctly
//     const iframe = document.createElement('iframe');
//     iframe.src = "https://stackblitz.com/edit/react-ts-starter?embed=1&file=src/App.tsx&hideNavigation=1&theme=dark&view=editor&ctl=1";
//     iframe.width = "100%";
//     iframe.height = "800px";
//     iframe.style.border = "none";
//     iframe.title = "StackBlitz React Editor";
//     iframe.allow = "accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking";
//     iframe.sandbox = "allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts";
    
//     // Clear any existing content and append the iframe
//     if (containerRef.current) {
//       containerRef.current.innerHTML = '';
//       containerRef.current.appendChild(iframe);
//     }
//   }, []);
  
//   return <div ref={containerRef} className="stackblitz-container" />;
// }

// import { CodeSandbox } from '@codesandbox/sdk';

export default function CodeEditor() {
    // const sdk = new CodeSandbox("csb_v1_IkZC3b0hJDaeS0Q08BYUjH0pwuWVnORCzQgM5MNMDwg");
    async function createAndAccessSandbox() {
    
        // const sandbox = await sdk.sandbox.create();
        
        // console.log("Sandbox ID:", sandbox.id);
        // console.log("Sandbox URL:", sandbox.url);
    }
    
    createAndAccessSandbox();
        return (
        <iframe
            src="http://192.168.252.230:8080/?folder=/home/coder/project"
            width="100%"
            height="800px"
            style={{ border: "none" }}
            title="CodeSandbox IDE"
        />
//         <iframe src="https://codesandbox.io/p/sandbox/mzg672?embed=1&file=%2Fvite.config.js"
//         style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
//         title="React (JS) (forked)"
//         allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
//         sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
//    ></iframe>
        );
  }
