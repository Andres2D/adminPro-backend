const User = require('../models/user');

const validateAdminRole = async(req, res, next) => {

    const _id = req._id;

    try {
        const userDB = await User.findById(_id);

        if(!userDB) {
            return res.status(400).json({
                ok: false,
                msg: 'User don´t exist'
            });
        }

        if(userDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'Action don´t allowed'
            });
        }

        next();
         
    }catch(err) { 
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }
}

const validateSameUserUpdate = async(req, res, next) => {

    const _id = req._id;
    const clientId = req.params.id;

    try {
        const userDB = await User.findById(_id);

        if(!userDB) {
            return res.status(400).json({
                ok: false,
                msg: 'User don´t exist'
            });
        }

        if(userDB.role !== 'ADMIN_ROLE' || _id === clientId) {
            next();
        }else{
            return res.status(403).json({
                ok: false,
                msg: 'Action don´t allowed'
            });
        }
    }catch(err) { 
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }
}

module.exports = {
    validateAdminRole,
    validateSameUserUpdate
}
