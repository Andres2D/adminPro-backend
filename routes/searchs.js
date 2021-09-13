/*
    Route: '/api/all/
*/

const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');

const { getAll, getDocumentsCollection } = require('../controllers/searchs');

const router = Router();

router.get( '/:search', validateJWT, getAll);
router.get( '/collection/:table/:search', validateJWT, getDocumentsCollection);

module.exports = router;
