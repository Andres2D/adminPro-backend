/*
    Route: /api/users
*/
const { Router } = require('express');
const { getUsers, createUsers, updateUser, deleteUser } = require('../controllers/user');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateAdminRole, validateSameUserUpdate } = require('../middlewares/validate-admin-role');

const router = Router();

router.get( '/', validateJWT, getUsers);

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
        validateJWT,
        validateSameUserUpdate,
        check('name', 'The name is required').notEmpty(),
        check('email', 'The email is required').notEmpty(),
        check('role', 'The role is required').notEmpty(),
        validateFields
    ],
    updateUser
);

router.delete( '/:id', validateJWT, deleteUser );

module.exports = router;
