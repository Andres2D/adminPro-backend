/*
    Route: '/api/uploads/
*/

const { Router, application } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { fileUpload, returnImage } = require('../controllers/uploads');
const expressFileUpload = require('express-fileupload');

const router = Router();
// Using the middleware to the uploaded image
router.use(expressFileUpload());

router.put( '/:type/:id', validateJWT, fileUpload);
router.get( '/:type/:image', returnImage );

module.exports = router;
