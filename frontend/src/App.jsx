import { useState, useEffect, useCallback } from "react";
import { getAuthHeaders } from "../helpers/AuthHeaders";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import TaskForm from "./components/TaskForm";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
  }, [user, fetchTaskList]);

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
        <h1>Task Tracker</h1>
        <div className="error-message">
          <p>Unable to connect to the backend. </p>
          <p>Please start the backend server and refresh the page.</p>
        </div>
      </main>
    );
  }

  return (
    <div className="container my-4">
      <Navbar user={user} logout={logout} />
      <main>
        <Container className="mt-4">
          <h1 className="text-center">Task Tracker</h1>

          {loading && <p>Loading tasks...</p>}
          {error && <p>Error: {error}</p>}
          {!user && (
            <>
              <span className="text-center">
                <h5>Please log in to view your tasks.</h5>
              </span>
              <div className="card mt-3 p-3">
                <RegisterForm />
              </div>
              <div className="card mt-3 p-3">
                <LoginForm onLogin={handleLogin} />
              </div>
            </>
          )}

          {!loading && !error && user && (
            <>
              <div className="card mt-3 p-3">
                <Row className="justify-content-center">
                  <Col md={5}>
                    <TaskForm user={user} fetchTaskList={fetchTaskList} />
                  </Col>
                </Row>
              </div>
              <div className="card mt-3 p-3">
                <h2 className="mb-4 text-center">My Tasks</h2>
                <Row className="justify-content-center">
                  <Col md={5}>
                    <TaskList
                      user={user}
                      taskList={taskList}
                      onTaskUpdated={fetchTaskList}
                    />
                  </Col>
                </Row>
              </div>
            </>
          )}
        </Container>
      </main>
    </div>
  );
}

export default App;
