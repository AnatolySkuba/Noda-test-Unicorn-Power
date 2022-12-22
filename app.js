const express = require("express");
const cors = require("cors");
require("dotenv").config();

const routes = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static("public"));
app.use("/", routes.auth);

app.use((_, res) => {
    res.status(404).json({ message: "Not found" });
});

app.use((err, _, res, __) => {
    const { status = 500, message = "Server error", description } = err;
    res.status(status).json({ message, description });
});

module.exports = app;
