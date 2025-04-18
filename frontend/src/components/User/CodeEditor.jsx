import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CodeEditor() {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const userRole = localStorage.getItem("userRole");

    const userQuestion = localStorage.getItem("userQues");

    const framework = localStorage.getItem("framework");

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
        <div>
            {framework === "react" ? (
                <iframe
                    src="http://localhost:8080/?folder=/home/coder/project"
                    width="100%"
                    height="800px"
                    style={{ border: "none" }}
                    title="CodeSandbox IDE"
                />
            ) : framework === "vue" ? (
                <iframe
                    src="http://localhost:8081/?folder=/home/coder/project"
                    width="100%"
                    height="800px"
                    style={{ border: "none" }}
                    title="CodeSandbox IDE"
                />
            ) : (
                <p style={{ color: "red", textAlign: "center", marginTop: "2rem" }}>
                    🚫 Unauthorized access. You do not have permission to view this editor.
                </p>
            )}
        </div>
    );
}
