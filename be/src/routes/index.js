const express = require('express'); 

const worksRouter = require('./work.router');

function routerApi(app) {
  const router = express.Router();
  // main api end point 
  app.use('/api/v1', router); 
  // grouped api end point
  router.use('/works', worksRouter);
}

module.exports = routerApi;
