const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");

// Middlewares
const morgan = require("morgan");
const cors = require("cors");
// const { corsMiddleware, authenticateToken, errorHandler } = require("./src/middlewares")

// Importing Routes
const routes = require("./src/routes");

// Using middlewares to all the requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Using Routes
app.use("/api", routes)


module.exports = app;