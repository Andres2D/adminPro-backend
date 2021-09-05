/*
    Route: /api/users
*/
const { Router } = require('express');
const { getUsers, createUsers } = require('../controllers/user');

const router = Router();

router.get( '/', getUsers);

router.post('/', createUsers);

module.exports = router;
