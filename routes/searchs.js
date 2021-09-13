/*
    Route: '/api/all
*/

const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');

const { getAll } = require('../controllers/searchs');

const router = Router();

router.get( '/', [validateJWT], getAll);

module.exports = router;
