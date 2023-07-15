const express = require('express');
const router = express.Router();
const clubController = require('../controllers/clubController.js');



router.get('/clubs',clubController.getClubs);
router.post('/clubs',clubController.postClub);

module.exports = router;