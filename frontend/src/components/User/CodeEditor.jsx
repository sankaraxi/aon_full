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
            src="https://codesandbox.io/embed/mzg672?autoresize=1&codemirror=1" // Opens a new CodeSandbox instance
            width="100%"
            height="800px"
            style={{ border: "none" }}
            title="CodeSandbox IDE"
        />
        );
  }


  // import { Sandpack } from "@codesandbox/sandpack-react";

// // export default function CodeEditor() {
// //   return (
// //     <Sandpack
// //       template="react"
// //       theme="light" // Use "dark" for a dark theme
// //       files={{
// //         "/App.js": `export default function App() { return <h1>Hello World</h1>; }`,
// //       }}
// //       options={{
// //         showNavigator: true, // Show file tabs
// //         showLineNumbers: true, // Show line numbers
// //         editorHeight: 400, // Set editor height
// //       }}
// //     />
// //   );
// // }