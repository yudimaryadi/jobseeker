const express = require("express");
const router = express.Router();
const { getCandidate } = require("../controllers/candidatesController");

// Define your candidate routes here
router.get("/", getCandidate);

router.get("/:id", (req, res) => {
  // Handle the GET request for /candidates/:id
  const candidateId = req.params.id;
  res.send(`Candidate ID: ${candidateId}`);
});

// Export the router
module.exports = router;
