const express = require('express');
const router = express.Router();
const stakesService = require('./stakes.service');

// routes
router.get('/', getAllStakes);

module.exports = router;


function getAllStakes(req, res, next) {
    stakesService.getAllStakes()
        .then(users => res.json(users))
        .catch(err => next(err));
}
