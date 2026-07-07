const { Router, request } = require("express");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware/authMiddleware");
const Task = require("../models/Task");

function protectedRoutes() {
  const router = Router();

  //*************************CREATE TASKS***********************/
  router.post("/tasks", authMiddleware, async (req, res) => {
    try {
      const { title, description, isCompleted } = req.body;

      //Validate required fields
      if (!title) {
        return res.status(400).json({ message: "Title is required" });
      }

      //Create the task
      const newTask = await Task.create({
        userId: req.user.id,
        title,
        description,
        isCompleted: isCompleted ?? false,
      });

      //Return the created task
      return res
        .status(201)
        .json({ message: "Task created successfully", task: newTask });
    } catch (error) {
      console.error("Error creating task:", error);
      return res.status(500).json({ message: "Server error task" });
    }
  });

  //*************************GET ALL TASKS***********************/
  router.get("/tasks", authMiddleware, async (req, res) => {
    try {
      //Fetch all tasks for user
      const tasks = await Task.find({ userId: req.user.id });

      //Return tasks for this user
      return res
        .status(200)
        .json({ message: "Tasks retrieved successfully", tasks });
    } catch (error) {
      console.error("Error retrieving tasks:", error);
      return res.status(500).json({ message: "Server error task" });
    }
  });

  //*************************GET ONE TASK BY ID***********************/
  router.get("/tasks/:taskId", authMiddleware, async (req, res) => {
    try {
      const { taskId } = req.params;

      //Fetch one task by Id for user
      const oneTask = await Task.findOne({
        userId: req.user.id,
        taskId: Number(taskId),
      });

      if (!oneTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      //Return tasks for this user
      return res
        .status(200)
        .json({ message: "Task retrieved successfully", oneTask });
    } catch (error) {
      console.error("Error retrieving your task:", error);
      return res.status(500).json({ message: "Server error task" });
    }
  });

  //*************************UPDATE TASK ID***********************/
  router.patch("/tasks/:taskId", authMiddleware, async (req, res) => {
    try {
      const { taskId } = req.params;
      const { title, description, isCompleted } = req.body;

      //Make sure body has title
      if (title !== undefined && title.trim() === "") {
        return res
          .status(400)
          .json({ message: "Title is required and cannot be empty" });
      }

      //Validate taskId
      const foundTask = await Task.findOne({
        userId: req.user.id,
        taskId: Number(taskId),
      });

      if (!foundTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      // Apply updates to task
      if (title !== undefined) {
        foundTask.title = title;
      }
      if (description !== undefined) {
        foundTask.description = description;
      }
      if (isCompleted !== undefined) {
        foundTask.isCompleted = isCompleted;
      }

      //Save updated the task
      const updatedTask = await foundTask.save();

      //Return the updated task
      return res
        .status(200)
        .json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
      console.error("Error updating task:", error);
      return res.status(500).json({ message: "Server error task" });
    }
  });

  //*************************DELETE TASK BY ID***********************/
  router.delete("/tasks/:taskId", authMiddleware, async (req, res) => {
    try {
      const { taskId } = req.params;

      //Check if task exists for user
      const oldTask = await Task.findOne({
        userId: req.user.id,
        taskId: Number(taskId),
      });

      if (!oldTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      //Delete task from database
      const deletedTask = await Task.findOneAndDelete({
        userId: req.user.id,
        taskId: Number(taskId),
      });

      //Return tasks for this user
      return res.status(200).json({
        message: "Task deleted successfully",
        deletedTaskId: taskId,
        deletedTaskTitle: oldTask.title,
      });
    } catch (error) {
      console.error("Error deleting your task:", error);
      return res.status(500).json({ message: "Server error task" });
    }
  });
  return router;
}

module.exports = { protectedRoutes };
