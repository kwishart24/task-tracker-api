import { useState } from "react";
import { getAuthHeaders } from "../../helpers/AuthHeaders";

function TaskForm({ user, fetchTaskList }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in to create a task.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/protected/tasks`,
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            title,
            description,
            isCompleted,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Unable to create new task.");
      }

      await response.json();

      // clear form
      setTitle("");
      setDescription("");
      setIsCompleted(false);

      // tell parent to refresh tasks
      fetchTaskList();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section>
      <h2>Add a New Task</h2>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

export default TaskForm;
