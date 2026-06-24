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

  //*************************GET TASKS***********************/

  //*************************UPDATE TASKS***********************/

  //*************************DELETE TASKS***********************/

  return router;
}

module.exports = { protectedRoutes };
