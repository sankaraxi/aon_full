import React, { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
// import * as monaco from 'monaco-editor';
import { executeReactApp, startWebContainer } from './WebContaniner/IDE';

const CodeEditor = () => {
    const [webContainer, setWebContainer] = useState(null);
    const [files, setFiles] = useState(['App.js', 'MyComponent.js']);
    const [currentFile, setCurrentFile] = useState('App.js');
    const editorRef = useRef(null);
    useEffect(() => {
        async function init() {
            const container = await startWebContainer();
            setWebContainer(container);
            console.log(container);
        }
        init();
    }, []);

    const handleEditorChange = async (value) => {
        if (webContainer && value) {
            await webContainer.fs.writeFile(`/src/${currentFile}`, value);
        }
    };

    const addNewFile = async () => {
        const newFileName = prompt('Enter component name (e.g., NewComponent.js)');
        if (newFileName && !files.includes(newFileName)) {
            setFiles([...files, newFileName]);
            await webContainer.fs.writeFile(`/src/${newFileName}`, 'import React from "react";\n\nexport default function () { return <div>New Component</div>; }');
        }
    };

    const runReactApp = async () => {
        if (webContainer) {
            await executeReactApp(webContainer);
        }
    };

    return (
        <div style={{ height: '500px', border: '1px solid #ccc' }}>
            <div>
                {files.map((file) => (
                    <button key={file} onClick={() => setCurrentFile(file)}>
                        {file}
                    </button>
                ))}
                <button onClick={addNewFile}>➕ Add Component</button>
            </div>
            <>
            <button onClick={runReactApp}>🚀 Run App</button>
            <Editor
                height="100%"
                width="100%"
                defaultLanguage="javascript"
                theme="vs-dark"
                onMount={(editor) => (editorRef.current = editor)}
                onChange={handleEditorChange}
            />
            </>
            
        </div>
    );
};

export default CodeEditor;