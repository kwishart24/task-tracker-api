import { useEffect, useState } from "react";

function TaskList() {
  // Store the todo items returned from the API
  const [taskList, setTaskList] = useState([]);

  // Track whether the data is still loading
  const [loading, setLoading] = useState(true);

  // Store an error message if something goes wrong
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTaskList() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/TaskList",
        );

        if (!response.ok) {
          throw new Error("Unable to retrieve todo data.");
        }

        const data = await response.json();

        // Show only the first 10 items so the page is easier to read
        setTaskList(data.slice(0, 10));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTaskList();
  }, []);

  if (loading) {
    return <p>Loading TaskList...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section>
      <h2>Tasks</h2>

      <ul>
        {taskList.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong>
            <br />
            Status: {task.completed ? "Complete" : "Not Complete"}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TaskList;
