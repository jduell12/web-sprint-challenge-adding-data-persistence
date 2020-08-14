const express = require("express");
const router = express.Router();

const Tasks = require("./tasks-model");

//returns all tasks in the database
router.get("/", (req, res) => {
  try {
    Tasks.getAllTasks().then((tasks) => {
      tasks.forEach((task) => {
        if (task.completed == 0) {
          task.completed = false;
        } else {
          task.completed = true;
        }

        if (task.notes == null) {
          task.notes = "";
        }
      });
      res.status(200).json({ data: tasks });
    });
  } catch {
    res.status(500).json({
      errorMessage: "Could not retrieve resources from database",
    });
  }
});

module.exports = router;
