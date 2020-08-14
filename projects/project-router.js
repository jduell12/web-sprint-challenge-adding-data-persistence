const express = require("express");
const router = express.Router();

const Projects = require("./project-model");

//gets list of projects from database
router.get("/", (req, res) => {
  try {
    Projects.getProjects()
      .then((projects) => {
        //changes boolean number to user friendly english
        projects.forEach((project) => {
          if (project.completed == 0) {
            project.completed = false;
          } else {
            project.completed = true;
          }
        });

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

//gets project with specified id
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

//gets resources for project with specified id
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

//gets tasks for project with specified id
router.get("/:id/tasks", validateProjectId, (req, res) => {
  try {
    Projects.getProjectTasks(req.project).then((tasks) => {
      if (tasks) {
        //changes to user friendly english
        tasks.forEach((task) => {
          if (task.completed == 0) {
            task.completed = false;
          } else {
            task.completed = true;
          }
        });
        res.status(200).json({ data: tasks });
      } else {
        res.status(404).json({ message: "This project has no tasks yet." });
      }
    });
  } catch {
    res.status(500).json({
      errorMessage: "Could not retrieve project resources from database",
    });
  }
});

//adds a project to the database
router.post("/", validateProject, (req, res) => {
  try {
    Projects.addProject(req.body).then((project) => {
      if (project.completed == 0) {
        project.completed = false;
      } else {
        project.completed = true;
      }
      res.status(201).json({ data: project });
    });
  } catch {
    res.status(500).json({
      errorMessage: "Could not retrieve project resources from database",
    });
  }
});

//adds a resource to the specified project
router.post(
  "/:id/resource",
  validateProjectId,
  validateResource,
  (req, res) => {
    try {
      Projects.addResource(req.project, req.body).then((success) => {
        res.status(201).json({ data: success });
      });
    } catch {
      res.status(500).json({
        errorMessage: "Could not retrieve project resources from database",
      });
    }
  },
);

/*    res.status(500).json({
      errorMessage: "Could not retrieve project resources from database",
    });
 */

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

function validateProject(req, res, next) {
  const projectInfo = req.body;

  if (!projectInfo.name) {
    res.status(200).json({ message: "Please include a project name" });
  } else {
    next();
  }
}

function validateResource(req, res, next) {
  const resourceInfo = req.body;

  if (!resourceInfo.name) {
    res.status(400).json({ message: "Please provide a name for the resource" });
  } else {
    next();
  }
}

module.exports = router;
