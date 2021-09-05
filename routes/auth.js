/*
    Route: '/api/login'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const router = Router();

router.post('/', 
    [
        check('email', 'The email is required').isEmail(),
        check('password', 'The password required').notEmpty(),
        validateFields
    ],
    login
)

module.exports = router;