const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();

const verifyUser = require("./db");

const port = process.env.PORT || 4000;

const app = express();

app.set("port", port);
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.json({ message: "SO1 - Tercer Parcial" });
});

//Route API
app.post("/mguirola201700772", verifyUser);


app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
