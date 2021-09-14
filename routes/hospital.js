/*
    Route: '/api/hospitals'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validate-fields');

const {
    getHospitals,
    createHospitals,
    updateHospitals,
    deleteHospitals
} = require('../controllers/hospital');

const router = Router();

router.get( '/', validateJWT, getHospitals);

router.post('/', 
    [
        validateJWT,
        check('name', 'The hospital`s name is required').notEmpty(),
        validateFields
    ], 
    createHospitals
);

router.put( '/:id', 
    [],
    updateHospitals
);

router.delete( '/:id', deleteHospitals );

module.exports = router;
