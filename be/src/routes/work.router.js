const express = require('express');
const router = express.Router(); 
const worksController = require('../controllers/work.controller');
const uploadController = require('../controllers/upload.controller');
const upload = require("../middleware/upload");

router
    .get('/', worksController.get )
    .get('/:id', worksController.getById )
    .post('/', worksController.create )
    .put('/:id', worksController.update )
    .delete('/:id', worksController._delete )
    .post("/upload", upload.single("file"), uploadController.upload);

module.exports = router;
