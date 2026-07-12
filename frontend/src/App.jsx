import { useEffect } from "react";
import TaskList from "./components/TaskList";
import RegisterForm from "./components/RegisterForm";

function App() {
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/health`)
      .then((res) => res.json())
      .then((data) => console.log("Backend says:", data))
      .catch((err) => console.error("Health check failed:", err));
  }, []);

  return (
    <main>
      <h1>React API Practice</h1>

      <p>
        This app connects to a practice API, retrieves todo data, and displays
        the results using React.
      </p>

      <TaskList />
      <RegisterForm />
    </main>
  );
}

export default App;
