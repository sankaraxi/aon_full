import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CodeEditor() {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const userRole = localStorage.getItem("userRole");

    const dockerPort = localStorage.getItem("dockerPort");
    var outputPort = localStorage.getItem("outputPort");

    const dockerVuePort = Number(localStorage.getItem("dockerPort")) + 1;

    const framework = localStorage.getItem("framework");

    if (framework === "vue"){
       outputPort = Number(localStorage.getItem("outputPort")) + 1;
    }

    console.log(dockerPort,dockerVuePort, outputPort, framework);

    const navigate = useNavigate();

  // console.log(userRole);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");

    console.log("User role:", userRole);

    if (["4", "3", "5"].includes(userRole)) {
      setIsAuthorized(true); // Let them through
    } else {
      navigate("/"); // Kick 'em out
    }
  }, [navigate]);

    return (
        <div className="relative h-[625px]"> {/* 👈 height added */}
        {framework === "react" ? (
            <iframe
            src={`http://localhost:${dockerPort}/?folder=/home/coder/project`}
            width="100%"
            height="100%"
            style={{ border: "none" }}
            title="CodeSandbox IDE"
            />
        ) : framework === "vue" ? (
            <iframe
            src={`http://localhost:${dockerVuePort}/?folder=/home/coder/project`}
            width="100%"
            height="100%"
            style={{ border: "none" }}
            title="CodeSandbox IDE"
            />
        ) : (
            <p style={{ color: "red", textAlign: "center", marginTop: "2rem" }}>
            🚫 Unauthorized access. You do not have permission to view this editor.
            </p>
        )}

        {/* ✅ Output button - now sticky in bottom right */}
        <div className="absolute bottom-6 right-6 z-50">
        <Link to={`http://localhost:${outputPort}`} target="_blank" rel="noopener noreferrer">
            <button className="bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow-lg
                            hover:bg-blue-700 hover:shadow-xl
                            transition duration-300 ease-in-out
                            focus:outline-none focus:ring-4 focus:ring-blue-300
                            ring-1 ring-blue-500/50 backdrop-blur-sm">
                    Output
            </button>
        </Link>
        </div>
        </div>

    );
}
