import { useEffect, useState } from "react";

function TodoList() {
  // Store the todo items returned from the API
  const [todos, setTodos] = useState([]);

  // Track whether the data is still loading
  const [loading, setLoading] = useState(true);

  // Store an error message if something goes wrong
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos",
        );

        if (!response.ok) {
          throw new Error("Unable to retrieve todo data.");
        }

        const data = await response.json();

        // Show only the first 10 items so the page is easier to read
        setTodos(data.slice(0, 10));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTodos();
  }, []);

  if (loading) {
    return <p>Loading todos...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section>
      <h2>Todo Items</h2>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <strong>{todo.title}</strong>
            <br />
            Status: {todo.completed ? "Complete" : "Not Complete"}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TodoList;
