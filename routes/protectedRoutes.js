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

  //*************************UPDATE TASKS***********************/


  
  //*************************DELETE TASKS***********************/

  return router;
}

module.exports = { protectedRoutes };
