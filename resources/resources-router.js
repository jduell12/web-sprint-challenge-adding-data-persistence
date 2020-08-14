const express = require("express");
const router = express.Router();

const Resources = require("./resource-model");
const { resource } = require("../api/server");

router.get("/", (req, res) => {
  try {
    Resources.getAllResources().then((resources) => {
      res.status(200).json({ data: resources });
    });
  } catch {
    res.status(500).json({
      errorMessage: "Could not retrieve resources from database",
    });
  }
});

module.exports = router;
