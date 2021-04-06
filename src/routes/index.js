const express = require('express');

const docsRoutes = require('./docs.routes');
const categoriesRoutes = require('./categories.routes');
const chaptersRoutes = require('./chapters.routes');
const coursesRoutes = require('./course.routes');
const usersRoutes = require('./users.routes');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/users',
        route: usersRoutes
    },
    {
        path: '/courses',
        route: coursesRoutes
    },
    {
        path: '/chapters',
        route: chaptersRoutes
    },
    {
        path: '/categories',
        route: categoriesRoutes
    },
]

const devRoutes = [
    // routes available only in development mode
    {
        path: '/api-docs',
        route: docsRoutes,
    }
]

// Applying default routes
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

// Applying development routes
devRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;