/*
    Route: /api/users
*/
const { Router } = require('express');
const { getUsers, createUsers, updateUser } = require('../controllers/user');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get( '/', getUsers);

router.post('/', 
    [
        check('name', 'The name is required').notEmpty(),
        check('password', 'The password is required').notEmpty(),
        check('email', 'The email is required').isEmail(),
        validateFields
    ], 
    createUsers
);

router.put( '/:id', 
    [
        check('name', 'The name is required').notEmpty(),
        check('email', 'The email is required').notEmpty(),
        check('role', 'The role is required').notEmpty(),
        validateFields
    ],
    updateUser
);

module.exports = router;
