import { useState } from "react";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function DockerCommand() {
  const command = 'docker-compose -f "C:\\Users\\your_username\\Downloads\\docker-compose.yml" up -d';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
      <div className="bg-white mt-4 p-6 max-w-4xl w-full border border-gray-200">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Start Your Docker Application
        </h2>

        {/* Command Box */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 rounded-lg flex items-center justify-between shadow-md">
          <code className="text-sm truncate">{command}</code>
          <button 
            onClick={handleCopy} 
            className="ml-4 px-3 py-2 border border-gray-500 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition-all duration-200"
          >
            {copied ? (
              <>
                <ClipboardCheck className="w-4 h-4 text-green-400" />
                <span className="text-green-400"></span>
              </>
            ) : (
              <>
                <Clipboard className="w-4 h-4" />
                <span></span>
              </>
            )}
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-4 text-gray-700 text-sm">
          <p>🔹 Ensure the file exists in the <b>Downloads</b> folder. If not, replace <code className="bg-gray-200 px-1 py-0.5 rounded">file_path</code> with the actual location.</p>
          <p>🔹 Replace <code className="bg-gray-200 px-1 py-0.5 rounded">your_username</code> with your Windows username.</p>
          {/* <p>🔹 Once the files are installed navigate to <Link className="text-blue-400" to="http://localhost:8081">http://localhost:8081</Link> and start the assement</p> */}
          <p>🔹 Once the Docker setup is complete, start the application!</p>
        </div>
      </div>
  );
}
