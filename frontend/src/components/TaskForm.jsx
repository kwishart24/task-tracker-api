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
    <section className="my-3">
      <h2>Add a New Task</h2>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="my-4">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            className="form-control"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <input
            className="form-control"
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-success mt-4">
          Submit
        </button>
      </form>
    </section>
  );
}

export default TaskForm;
