import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";

function App() {
  const [user, setUser] = useState(null);

  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
    setLoggedIn(true);
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/health`)
      .then((res) => res.json())
      .then((data) => console.log("Backend says:", data))
      .catch((err) => console.error("Health check failed:", err));
  }, []);

  return (
    <>
      <Navbar user={user} loggedIn={loggedIn} />
      <main>
        <h1>React API Practice</h1>

        <p>
          This app connects to a practice API, retrieves todo data, and displays
          the results using React.
        </p>

        <TaskList />
        <RegisterForm />
        <LoginForm onLogin={handleLogin} setLoggedIn={setLoggedIn} />
      </main>
    </>
  );
}

export default App;
