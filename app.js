const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");

// Middlewares
const morgan = require("morgan");
const cors = require("cors");
const { corsMiddleware, authenticateToken, errorHandler } = require("./src/middlewares")

// Importing Routes
const coursesRoutes = require("./src/routes/course.routes");
const categoriesRoutes = require("./src/routes/categories.routes");
const chapterRoutes = require("./src/routes/chapters.routes");
const userRoutes = require("./src/routes/users.routes");

// Using middlewares to all the requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Using Routes
app.use("/api/courses", coursesRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/chapters", chapterRoutes);
app.use("/api/users", userRoutes);



module.exports = app;
