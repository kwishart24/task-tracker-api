import { useState } from "react";
import { getAuthHeaders } from "../../helpers/AuthHeaders";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

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
          <Card key={task._id} className="mb-3 shadow-sm">
            <Card.Body>
              {editingTaskId === task.taskId ? (
                <>
                  <label htmlFor="title" className="form-label">
                    Title:{" "}
                  </label>
                  <input
                    className="form-control"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />

                  <label htmlFor="description" className="form-label mt-3">
                    Description:{" "}
                  </label>
                  <input
                    className="form-control"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                  />
                  <div className="my-3">
                    <Button
                      onClick={() => saveTask(task.taskId)}
                      className="btn btn-success me-2"
                    >
                      Save
                    </Button>

                    <Button
                      onClick={() => setEditingTaskId(null)}
                      className="btn btn-danger me-2"
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <div className="mt-4">
                  <h4>{task.title}</h4>

                  <p>
                    {task.description && <p>Description: {task.description}</p>}
                  </p>
                  <Badge
                    bg={task.isCompleted ? "success" : "warning"}
                    className="mb-3"
                  >
                    {task.isCompleted ? "Completed" : "Incomplete"}
                  </Badge>
                </div>
              )}

              <p>Status: {task.isCompleted ? "Completed" : "Incomplete"}</p>

              <div className="mt-3">
                <Button
                  onClick={() => handleCompleteToggle(task)}
                  className="btn btn-success me-2"
                >
                  Mark as {task.isCompleted ? "Incomplete" : "Complete"}
                </Button>
                <Button
                  onClick={() => startEditing(task)}
                  className="btn btn-warning me-2"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(task.taskId)}
                  className="btn btn-danger me-2"
                >
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))
      )}
    </section>
  );
}

export default TaskList;
