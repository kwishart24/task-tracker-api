import { useState } from "react";
import { getAuthHeaders } from "../../helpers/AuthHeaders";

function TaskList({ taskList, onTaskUpdated }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  //*************************UPDATE COMPLETION STATUS***********************/
  const handleCompleteToggle = async (task) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/protected/tasks/${task.taskId}`,

        {
          method: "PATCH",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            isCompleted: !task.isCompleted,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Unable to update task.");
      }

      await response.json();

      // Refresh task list after update
      onTaskUpdated();
    } catch (error) {
      console.error(error);
    }
  };

  //*************************UPDATE OTHER FIELDS***********************/
  const startEditing = (task) => {
    setEditingTaskId(task.taskId);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
  };

  //Saving a task
  const saveTask = async (taskId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/protected/tasks/${taskId}`,
        {
          method: "PATCH",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            title: editedTitle,
            description: editedDescription,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Unable to update task.");
      }

      await response.json();

      setEditingTaskId(null);
      onTaskUpdated();
    } catch (error) {
      console.error(error);
    }
  };

  //*************************DELETE TASKS***********************/
  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/protected/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: getAuthHeaders(),
        },
      );

      if (!response.ok) {
        throw new Error("Unable to delete task.");
      }

      await response.json();

      // Reload the task list
      onTaskUpdated();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      {taskList.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        taskList.map((task) => (
          <div key={task._id}>
            {editingTaskId === task.taskId ? (
              <>
                <input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />

                <input
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />

                <button onClick={() => saveTask(task.taskId)}>Save</button>

                <button onClick={() => setEditingTaskId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <h3>{task.title}</h3>

                {task.description && <p>Description: {task.description}</p>}
              </>
            )}

            <p>Status: {task.isCompleted ? "Completed" : "Incomplete"}</p>

            <button onClick={() => handleCompleteToggle(task)}>
              Mark as {task.isCompleted ? "Incomplete" : "Complete"}
            </button>
            <button onClick={() => startEditing(task)}>Edit</button>
            <button onClick={() => handleDelete(task.taskId)}>Delete</button>
          </div>
        ))
      )}
    </section>
  );
}

export default TaskList;
