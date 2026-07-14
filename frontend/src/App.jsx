import { useState, useEffect, useCallback } from "react";
import { getAuthHeaders } from "../helpers/AuthHeaders";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import TaskForm from "./components/TaskForm";

function App() {
  const [user, setUser] = useState(null);

  const [taskList, setTaskList] = useState([]);

  // Track whether the data is still loading
  const [loading, setLoading] = useState(false);

  // Store an error message if something goes wrong
  const [error, setError] = useState("");

  //const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (userData) => {
    console.log("Handlelogin called");
    console.log(userData);

    setUser(userData);
    //setLoggedIn(true);
  };

  const fetchTaskList = useCallback(async () => {
    if (!user) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/protected/tasks`,
        {
          headers: getAuthHeaders(),
        },
      );

      if (!response.ok) {
        throw new Error("Unable to retrieve task data.");
      }

      const data = await response.json();

      //console.log(data.tasks);

      setTaskList(data.tasks);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  //Watches user to load their tasks
  useEffect(() => {
    if (user) {
      fetchTaskList();
    }
  }, [user]);

  //Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setTaskList([]);
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/health`)
      .then((res) => res.json())
      .then((data) => console.log("Backend says:", data))
      .catch((err) => console.error("Health check failed:", err));
  }, []);

  if (loading) {
    return <p>Loading TaskList...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Navbar user={user} logout={logout} />
      <main>
        <h1>Task App</h1>

        {user ? (
          <TaskList
            user={user}
            taskList={taskList}
            onTaskUpdated={fetchTaskList}
          />
        ) : (
          <p>Please log in to view your tasks.</p>
        )}

        {user && <TaskForm user={user} fetchTaskList={fetchTaskList} />}
        <RegisterForm />
        <LoginForm onLogin={handleLogin} />
      </main>
    </>
  );
}

export default App;
