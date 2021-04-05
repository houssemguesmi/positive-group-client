const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDefinition = require('./src/config/swagger.config');

// Middlewares
const morgan = require("morgan");
const cors = require("cors");
// const { corsMiddleware, authenticateToken, errorHandler } = require("./src/middlewares")

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
// app.use(corsMiddleware());
// app.use(authenticateToken());
// app.use(errorHandler());

// Using Routes
app.use("/api/courses", coursesRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/chapters", chapterRoutes);
app.use("/api/users", userRoutes);

/**
 * API Documentation with Swagger.
 */
// const swaggerUi = require("swagger-ui-express"),
//     YAML = require("yamljs");
// swaggerDocument = YAML.load("./swagger.yaml");

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;