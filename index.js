const express = require("express");

const app = express();
const port = 3000;

const candidateRoute = require("./routes/candidatesRoute");

// Endpoint untuk route default "/"
app.use("/candidates", candidateRoute);

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
