const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");

const morgan = require("morgan");
const cors = require("cors");
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

// Using Cross Origin middelware
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }
//   next();
// });

module.exports = app;
