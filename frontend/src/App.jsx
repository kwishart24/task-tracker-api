import { useState, useEffect, useCallback } from "react";
import { getAuthHeaders } from "../helpers/AuthHeaders";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import TaskForm from "./components/TaskForm";

function App() {
  //Backend health check if the backend is connected
  const [backendConnected, setBackendConnected] = useState(true);
  const [backendError, setBackendError] = useState("");

  const [user, setUser] = useState(null);

  const [taskList, setTaskList] = useState([]);

  // Track whether the data is still loading
  const [loading, setLoading] = useState(false);

  // Store an error message if something goes wrong
  const [error, setError] = useState("");

  //Handlelogin setting user state
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

    // Temporary delay for testing
    // await new Promise((resolve) => setTimeout(resolve, 5000));

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
    const checkBackend = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/health`,
        );

        if (!response.ok) {
          throw new Error("Backend health check failed.");
        }

        const data = await response.json();

        console.log("Backend says: ", data);

        setBackendConnected(true);
        setBackendError("");
      } catch (err) {
        console.error(err);

        setBackendConnected(false);
        setBackendError(
          "Connection to the backend failed. Check the server is running.",
        );
      }
    };

    checkBackend();
  }, []);

  if (!backendConnected) {
    return (
      <main>
        <h1>Task App</h1>
        <div className="error-message">
          <p>Unable to connect to the backend. </p>
          <p>Please start the backend server and refresh the page.</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <Navbar user={user} logout={logout} />
      <main>
        <h1>Task App</h1>
        {loading && <p>Loading tasks...</p>}
        {error && <p>Error: {error}</p>}
        {!user && (
          <>
            <p>Please log in to view your tasks.</p>
            <RegisterForm />
            <LoginForm onLogin={handleLogin} />
          </>
        )}

        {!loading && !error && user && (
          <>
            <TaskForm user={user} fetchTaskList={fetchTaskList} />
            <TaskList
              user={user}
              taskList={taskList}
              onTaskUpdated={fetchTaskList}
            />
          </>
        )}
      </main>
    </>
  );
}

export default App;
