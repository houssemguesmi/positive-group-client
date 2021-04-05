const corsMiddleware = require("./cors"),
    authenticateToken = require("./authenticateToken"),
    errorHandler = require("./errorHandler");

module.exports = {
    corsMiddleware: corsMiddleware,
    authenticateToken: authenticateToken,
    errorHandler: errorHandler
}
