const corsMiddleware = require("./cors"),
    authenticateToken = require("./authenticateToken"),
    errorHandler = require("./errorHandler");

modules.exports = {
    corsMiddleware: corsMiddleware,
    authenticateToken: authenticateToken,
    errorHandler: errorHandler
}
