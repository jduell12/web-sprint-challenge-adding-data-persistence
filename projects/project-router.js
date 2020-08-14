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

router.get("/:id", validateProjectId, (req, res) => {
  const { id } = req.params;

  try {
    Projects.getProjectById(id).then((project) => {
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
    });
  } catch {
    res
      .status(500)
      .json({ errorMessage: "Could not retrieve project from database" });
  }
});

router.get("/:id/resources", validateProjectId, (req, res) => {
  try {
    Projects.getProjectResources(req.project).then((resources) => {
      res.status(200).json({ data: resources });
    });
  } catch {
    res.status(500).json({
      errorMessage: "Could not retrieve project resources from database",
    });
  }
});

//checks that there is a project that has the id provided
function validateProjectId(req, res, next) {
  const projectId = req.params.id;

  Projects.getProjectById(projectId)
    .then((project) => {
      req.project = project.id;
      next();
    })
    .catch((err) => {
      res.status(404).json({ message: "Invalid project id" });
    });
}

module.exports = router;
