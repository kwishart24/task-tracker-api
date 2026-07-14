function TaskList({ taskList }) {
  return (
    <section>
      {taskList.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        taskList.map((task) => (
          <div key={task._id}>
            <h3>{task.title}</h3>
            {task.description && <p>Description: {task.description}</p>}

            <p>Status: {task.isCompleted ? "Completed" : "Incomplete"}</p>
          </div>
        ))
      )}
    </section>
  );
}

export default TaskList;
