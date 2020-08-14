const express = require("express");
const router = express.Router();

const Tasks = require("./tasks-model");

//returns all tasks in the database
router.get("/", (req, res) => {
  try {
    Tasks.getAllTasks()
      .then((tasks) => {
        tasks.forEach((task) => {
          if (task.Completed == 0) {
            task.Completed = false;
          } else {
            task.Completed = true;
          }

          if (task.Notes == null) {
            task.Notes = "";
          }
        });
        res.status(200).json({ data: tasks });
      })
      .catch((err) => res.status(404).json({ message: err }));
  } catch {
    res.status(500).json({
      errorMessage: "Could not retrieve resources from database",
    });
  }
});

module.exports = router;
