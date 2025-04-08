// 1. First, set up a new React application
import React, { useState, useEffect } from 'react';
import { WebContainer } from '@webcontainer/api';
import * as monaco from 'monaco-editor';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// 2. Define the main App component that will host your assessment platform
const AppII= () => {
  const [webcontainerInstance, setWebcontainerInstance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [studentCode, setStudentCode] = useState({});
  const [testResults, setTestResults] = useState(null);

  // Initialize WebContainer when component mounts
  useEffect(() => {
    const bootWebContainer = async () => {
      try {
        // Initialize the WebContainer
        const instance = await WebContainer.boot();
        setWebcontainerInstance(instance);
        await setupDevEnvironment(instance);
        setLoading(false);
      } catch (error) {
        console.error('Failed to boot WebContainer:', error);
      }
    };

    bootWebContainer();
  }, []);

  // Set up the development environment with React and testing libraries
  const setupDevEnvironment = async (instance) => {
    // Define file structure for a basic React app with testing setup
    const files = {
      'package.json': {
        file: {
          contents: JSON.stringify({
            name: "react-assessment",
            version: "1.0.0",
            type: "module",
            dependencies: {
              "react": "^18.2.0",
              "react-dom": "^18.2.0",
              "@testing-library/react": "^14.0.0",
              "@testing-library/jest-dom": "^6.0.0",
              "jest": "^29.5.0",
              "tailwindcss": "^3.3.0"
            },
            scripts: {
              "test": "jest"
            }
          })
        }
      },
      'index.html': {
        file: {
          contents: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Frontend Assessment</title>
  <link href="./styles.css" rel="stylesheet">
</head>
<body>
  <div id="root"></div>
  <script type="module" src="./src/index.jsx"></script>
</body>
</html>
          `
        }
      },
      'src/index.jsx': {
        file: {
          contents: `
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
          `
        }
      },
      'src/App.jsx': {
        file: {
          contents: `
import React from 'react';

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800">
          Frontend Assessment Starter
        </h1>
        <p className="mt-2 text-gray-600">
          Edit this component according to the assessment requirements.
        </p>
      </div>
    </div>
  );
}

export default App;
          `
        }
      },
      'tailwind.config.js': {
        file: {
          contents: `
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
          `
        }
      },
      'styles.css': {
        file: {
          contents: `
@tailwind base;
@tailwind components;
@tailwind utilities;
          `
        }
      }
    };

    // Write files to the WebContainer filesystem
    await instance.mount(files);

    // Install dependencies
    const installProcess = await instance.spawn('npm', ['install']);
    const installExitCode = await installProcess.exit;
    
    if (installExitCode !== 0) {
      throw new Error('Installation failed');
    }

    // Start the development server
    await instance.spawn('npx', ['vite', '--port', '3000']);
  };

  // Load a specific assessment
  const loadAssessment = async (assessment) => {
    setCurrentAssessment(assessment);
    
    // Create initial files for the assessment
    if (webcontainerInstance) {
      // Reset the src directory for a clean start
      await resetSourceFiles(webcontainerInstance);
      
      // Create assessment-specific files
      await createAssessmentFiles(webcontainerInstance, assessment);
    }
  };

  // Reset source files for a new assessment
  const resetSourceFiles = async (instance) => {
    // Keep core files but reset student work area
    await instance.fs.rm('src/components', { recursive: true }).catch(() => {});
    await instance.fs.mkdir('src/components');
  };

  // Create assessment-specific files
  const createAssessmentFiles = async (instance, assessment) => {
    // Create the problem statement file
    await instance.fs.writeFile(
      'src/problem.md',
      assessment.description
    );
    
    // Create test files
    for (const test of assessment.tests) {
      await instance.fs.writeFile(
        `src/__tests__/${test.name}.test.jsx`,
        test.content
      );
    }
    
    // Create starter files if provided
    if (assessment.starterFiles) {
      for (const [path, content] of Object.entries(assessment.starterFiles)) {
        await instance.fs.writeFile(`src/${path}`, content);
        
        // Add to student code tracking
        setStudentCode(prev => ({
          ...prev,
          [path]: content
        }));
      }
    }
  };

  // Run tests against student code
  const runTests = async () => {
    if (!webcontainerInstance || !currentAssessment) return;
    
    // First, save all current files
    for (const [path, content] of Object.entries(studentCode)) {
      await webcontainerInstance.fs.writeFile(`src/${path}`, content);
    }
    
    // Run Jest tests
    const testProcess = await webcontainerInstance.spawn('npm', ['test']);
    
    let testOutput = '';
    testProcess.output.pipeTo(new WritableStream({
      write(data) {
        testOutput += data;
      }
    }));
    
    const testExitCode = await testProcess.exit;
    setTestResults({
      passed: testExitCode === 0,
      output: testOutput
    });
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading assessment environment...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header 
        assessment={currentAssessment} 
        onRunTests={runTests}
        testResults={testResults}
      />
      <main className="flex flex-1 overflow-hidden">
        <Sidebar 
          assessments={sampleAssessments} 
          onSelectAssessment={loadAssessment}
          webcontainerInstance={webcontainerInstance}
        />
        <IDE 
          studentCode={studentCode}
          setStudentCode={setStudentCode}
          webcontainerInstance={webcontainerInstance}
          currentAssessment={currentAssessment}
        />
      </main>
    </div>
  );
};

// 3. Create the Monaco Editor-based IDE component
const IDE = ({ studentCode, setStudentCode, webcontainerInstance, currentAssessment }) => {
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const editorRef = useRef(null);
  const containerRef = useRef(null);

  // Initialize the Monaco editor
  useEffect(() => {
    if (containerRef.current && !editorRef.current) {
      editorRef.current = monaco.editor.create(containerRef.current, {
        value: activeFile ? studentCode[activeFile] || '' : '',
        language: 'javascript',
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: {
          enabled: true
        },
        scrollBeyondLastLine: false,
        fontSize: 14,
        tabSize: 2
      });

      // Add change event listener
      editorRef.current.onDidChangeModelContent(() => {
        if (activeFile) {
          const newValue = editorRef.current.getValue();
          setStudentCode(prev => ({
            ...prev,
            [activeFile]: newValue
          }));
        }
      });
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.dispose();
        editorRef.current = null;
      }
    };
  }, []);

  // Update editor content when active file changes
  useEffect(() => {
    if (editorRef.current && activeFile) {
      const model = monaco.editor.createModel(
        studentCode[activeFile] || '',
        getLanguageFromFileName(activeFile)
      );
      editorRef.current.setModel(model);
    }
  }, [activeFile, studentCode]);

  // Update file list when webcontainer or assessment changes
  useEffect(() => {
    if (webcontainerInstance && currentAssessment) {
      fetchFileList();
    }
  }, [webcontainerInstance, currentAssessment]);

  const fetchFileList = async () => {
    if (!webcontainerInstance) return;
    
    try {
      const srcDir = await webcontainerInstance.fs.readdir('src', { withFileTypes: true });
      const fileList = [];
      
      for (const entry of srcDir) {
        if (entry.isDirectory()) {
          const subDir = await webcontainerInstance.fs.readdir(`src/${entry.name}`, { withFileTypes: true });
          for (const subEntry of subDir) {
            if (!subEntry.isDirectory()) {
              fileList.push(`${entry.name}/${subEntry.name}`);
            }
          }
        } else if (entry.name.endsWith('.jsx') || entry.name.endsWith('.js') || 
                  entry.name.endsWith('.css') || entry.name.endsWith('.md')) {
          fileList.push(entry.name);
        }
      }
      
      setFiles(fileList);
      if (fileList.length > 0 && !activeFile) {
        setActiveFile(fileList[0]);
      }
    } catch (error) {
      console.error('Error fetching file list:', error);
    }
  };

  const getLanguageFromFileName = (fileName) => {
    if (fileName.endsWith('.jsx') || fileName.endsWith('.js')) return 'javascript';
    if (fileName.endsWith('.css')) return 'css';
    if (fileName.endsWith('.md')) return 'markdown';
    if (fileName.endsWith('.html')) return 'html';
    return 'plaintext';
  };

  const createNewFile = async () => {
    const fileName = prompt('Enter file name (include extension, e.g., Component.jsx):');
    if (!fileName) return;
    
    try {
      // Determine directory structure
      let path = fileName;
      if (fileName.includes('/')) {
        const dir = fileName.substring(0, fileName.lastIndexOf('/'));
        await webcontainerInstance.fs.mkdir(`src/${dir}`, { recursive: true }).catch(() => {});
      }
      
      // Create empty file
      await webcontainerInstance.fs.writeFile(`src/${path}`, '');
      
      // Update file list and set as active
      fetchFileList();
      setActiveFile(path);
      setStudentCode(prev => ({
        ...prev,
        [path]: ''
      }));
    } catch (error) {
      console.error('Error creating file:', error);
    }
  };

  return (
    <div className="flex flex-1 border-l border-gray-300">
      <div className="w-48 bg-gray-800 text-white overflow-y-auto">
        <div className="p-3 border-b border-gray-700 flex justify-between items-center">
          <h3 className="font-medium">Explorer</h3>
          <button 
            onClick={createNewFile}
            className="text-gray-400 hover:text-white"
          >
            <span>+</span>
          </button>
        </div>
        <ul className="py-2">
          {files.map(file => (
            <li 
              key={file}
              className={`px-3 py-1 cursor-pointer hover:bg-gray-700 ${activeFile === file ? 'bg-gray-700' : ''}`}
              onClick={() => setActiveFile(file)}
            >
              {file}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 h-full" ref={containerRef}></div>
    </div>
  );
};

// 4. Create the Sidebar component for assessment selection
const Sidebar = ({ assessments, onSelectAssessment, webcontainerInstance }) => {
  const [preview, setPreview] = useState(false);
  const previewURL = webcontainerInstance ? `http://localhost:3000/` : '';

  return (
    <div className="w-64 bg-gray-100 border-r border-gray-300 flex flex-col">
      <div className="p-4 border-b border-gray-300">
        <h2 className="text-lg font-semibold">Assessments</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {assessments.map(assessment => (
          <div 
            key={assessment.id}
            className="p-3 border-b border-gray-200 hover:bg-gray-200 cursor-pointer"
            onClick={() => onSelectAssessment(assessment)}
          >
            <h3 className="font-medium">{assessment.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{assessment.shortDescription}</p>
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t border-gray-300">
        <button 
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setPreview(!preview)}
        >
          {preview ? 'Hide Preview' : 'Show Preview'}
        </button>
        
        {preview && previewURL && (
          <div className="mt-3 h-64 border border-gray-300 bg-white">
            <iframe
              src={previewURL}
              className="w-full h-full"
              title="Application Preview"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

// 5. Create the Header component
const Header = ({ assessment, onRunTests, testResults }) => {
  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-bold">Frontend Assessment Platform</h1>
        {assessment && (
          <p className="text-gray-400 mt-1">{assessment.title}</p>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        {assessment && (
          <button 
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
            onClick={onRunTests}
          >
            Run Tests
          </button>
        )}
        
        {testResults && (
          <div className={`px-3 py-1 rounded ${testResults.passed ? 'bg-green-500' : 'bg-red-500'}`}>
            {testResults.passed ? 'Tests Passed' : 'Tests Failed'}
          </div>
        )}
      </div>
    </header>
  );
};

// 6. Sample assessments data
const sampleAssessments = [
  {
    id: 1,
    title: "Basic React Component",
    shortDescription: "Create a button component with click counter",
    description: `
# Counter Button Component

Create a React component called \`CounterButton\` that:

1. Displays a button with the text "Click me"
2. Shows the current count below the button (starting at 0)
3. Increments the count when the button is clicked
4. Applies appropriate Tailwind CSS styling
    `,
    tests: [
      {
        name: "CounterButton",
        content: `
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CounterButton from '../components/CounterButton';

describe('CounterButton Component', () => {
  test('renders with initial count of 0', () => {
    render(<CounterButton />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });

  test('increments count when clicked', () => {
    render(<CounterButton />);
    const button = screen.getByText('Click me');
    
    fireEvent.click(button);
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
    
    fireEvent.click(button);
    expect(screen.getByText('Count: 2')).toBeInTheDocument();
  });
});
        `
      }
    ],
    starterFiles: {
      'components/CounterButton.jsx': `
import React, { useState } from 'react';

// Complete this component
function CounterButton() {
  // Your code here
  
  return (
    // Your JSX here
  );
}

export default CounterButton;
      `
    }
  },
  {
    id: 2,
    title: "Todo List Application",
    shortDescription: "Build a simple todo list with add/remove functionality",
    description: `
# Todo List Application

Create a Todo List application with the following components:
1. \`TodoInput\`: A form with an input field and a button to add new todos
2. \`TodoItem\`: Displays a todo item with a checkbox to mark as complete and a delete button
3. \`TodoList\`: Renders the list of TodoItem components

The application should:
- Allow adding new todos
- Allow marking todos as complete (with strikethrough text)
- Allow deleting todos
- Use Tailwind CSS for styling
    `,
    tests: [
      {
        name: "TodoApp",
        content: `
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoApp from '../components/TodoApp';

describe('TodoApp Integration', () => {
  test('allows adding a new todo', () => {
    render(<TodoApp />);
    
    // Add a new todo
    const input = screen.getByPlaceholderText('Add a new todo');
    const addButton = screen.getByText('Add');
    
    fireEvent.change(input, { target: { value: 'Test todo' } });
    fireEvent.click(addButton);
    
    expect(screen.getByText('Test todo')).toBeInTheDocument();
  });
  
  test('allows completing a todo', () => {
    render(<TodoApp />);
    
    // Add a todo
    const input = screen.getByPlaceholderText('Add a new todo');
    const addButton = screen.getByText('Add');
    
    fireEvent.change(input, { target: { value: 'Complete me' } });
    fireEvent.click(addButton);
    
    // Complete the todo
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    // Check that the todo has the completed class
    const todoText = screen.getByText('Complete me');
    expect(todoText).toHaveClass('line-through');
  });
  
  test('allows deleting a todo', () => {
    render(<TodoApp />);
    
    // Add a todo
    const input = screen.getByPlaceholderText('Add a new todo');
    const addButton = screen.getByText('Add');
    
    fireEvent.change(input, { target: { value: 'Delete me' } });
    fireEvent.click(addButton);
    
    // Delete the todo
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    
    // Verify todo is gone
    expect(screen.queryByText('Delete me')).not.toBeInTheDocument();
  });
});
        `
      }
    ],
    starterFiles: {
      'components/TodoApp.jsx': `
import React, { useState } from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

function TodoApp() {
  // Your code here
  
  return (
    // Your JSX here
  );
}

export default TodoApp;
      `,
      'components/TodoInput.jsx': `
import React, { useState } from 'react';

function TodoInput({ onAddTodo }) {
  // Your code here
  
  return (
    // Your JSX here
  );
}

export default TodoInput;
      `,
      'components/TodoList.jsx': `
import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onToggleTodo, onDeleteTodo }) {
  // Your code here
  
  return (
    // Your JSX here
  );
}

export default TodoList;
      `,
      'components/TodoItem.jsx': `
import React from 'react';

function TodoItem({ todo, onToggle, onDelete }) {
  // Your code here
  
  return (
    // Your JSX here
  );
}

export default TodoItem;
      `
    }
  }
];

// // 7. Create router and main entry point
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
// ]);

// const AppWrapper = () => {
//   return (
//     <RouterProvider router={router} />
//   );
// };

export default AppII;