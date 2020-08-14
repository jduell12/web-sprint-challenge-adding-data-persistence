const db = require("../data/db-config");

module.exports = {
  getAllResources,
};

function getAllResources() {
  return db("resources");
}
