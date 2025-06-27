import express from 'express';
import getHomepage from '../controller/homeController.js';

let router = express.Router();

let initWebRoutes = (app) => {
  router.get('/', getHomepage.getHomepage);
  router.get('/about', getHomepage.getAboutpage);
  return app.use('/', router);
}

export default initWebRoutes;