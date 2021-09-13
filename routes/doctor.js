/*
    Route: '/api/doctors'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validate-jwt');

const {
    getDoctors,
    createDoctors,
    updateDoctors,
    deleteDoctors
} = require('../controllers/doctor');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get( '/', getDoctors);

router.post('/', 
    [
        validateJWT,
        check('name', 'The doctor`s name is required').notEmpty(),
        check('hospital', 'Invalid id hospital').isMongoId(),
        validateFields
    ], 
    createDoctors
);

router.put( '/:id', 
    [],
    updateDoctors
);

router.delete( '/:id', deleteDoctors );

module.exports = router;
