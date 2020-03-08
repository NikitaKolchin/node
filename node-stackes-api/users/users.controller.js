const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
router.get('/', getAll);
router.post('/', add);
router.put('/', change);
router.delete('/', remove);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function add(req, res, next) {
    userService.add()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function change(req, res, next) {
    userService.change()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function remove(req, res, next) {
    userService.remove()
        .then(users => res.json(users))
        .catch(err => next(err));
}

