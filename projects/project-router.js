const express = require("express");
const router = express.Router();

const Projects = require("./project-model");

router.get("/", (req, res) => {
  try {
    Projects.getProjects()
      .then((projects) => {
        //changes boolean number to user friendly english
        if (projects[0].completed == 0) {
          projects[0].completed = false;
        } else {
          projects[0].completed = true;
        }

        res.status(200).json({ data: projects });
      })
      .catch((err) => {
        res.status(404).json({ message: err });
      });
  } catch {
    res
      .status(500)
      .json({ errorMessage: "Could not retrieve projects from database" });
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  try {
    Projects.getProjectById(id)
      .then((project) => {
        if (project) {
          //changes boolean number to user friendly english
          if (project.completed == 0) {
            project.completed = false;
          } else {
            project.completed = true;
          }
          res.status(200).json({ data: project });
        } else {
          res
            .status(404)
            .json({ message: "Could not find project with given id" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ error: err });
      });
  } catch {
    res
      .status(500)
      .json({ errorMessage: "Could not retrieve project from database" });
  }
});

module.exports = router;
