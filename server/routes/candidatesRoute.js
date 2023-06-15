const express = require("express");
const router = express.Router();
const {
  getCandidate,
  createCandidate,
  updateCandidate,
  deleteCandidate,
  getCandidateById,
} = require("../controllers/candidatesController");

// Define your candidate routes here
router.get("/", getCandidate);
router.post("/", createCandidate);
router.patch("/:id", updateCandidate);
router.delete("/:id", deleteCandidate);
router.get("/:id", getCandidateById);

// Export the router
module.exports = router;
