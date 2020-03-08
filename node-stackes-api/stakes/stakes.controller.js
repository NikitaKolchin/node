const express = require('express');
const router = express.Router();
const stakesService = require('./stakes.service');

// routes
router.get('/', getAll);
router.post('/', add);
router.put('/', change);
router.delete('/', remove);

module.exports = router;


function getAll(req, res, next) {
    stakesService.getAllStakes()
        .then(users => res.json(users))
        .catch(err => next(err));
}


function add(req, res, next) {
    stakesService.add()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function change(req, res, next) {
    stakesService.change()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function remove(req, res, next) {
    stakesService.remove()
        .then(users => res.json(users))
        .catch(err => next(err));
}


