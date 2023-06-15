const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const port = 3000;

const candidateRoute = require("./routes/candidatesRoute");

// for form
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// console monitor route
app.use(morgan("dev"));

// Endpoint untuk route default "/"
app.use("/candidates", candidateRoute);

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
