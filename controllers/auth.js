const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {
    const { email, password } = req.body;
    try {
        // Verify email
        const userDB = await User.findOne({ email });

        if(!userDB) {
            res.status(400).json({
                ok: false,
                msg: 'Wrong email'
            })
        }

        // Verify password
        const validPassword = bcrypt.compareSync( password, userDB.password);

        if(!validPassword) {
            res.status(400).json({
                ok: false,
                msg: 'Invalida password'
            });
        }

        // Generate Token - JWT
        const token = await generateJWT(userDB._id);

        res.json({
            ok: true,
            token
        })
    } catch(ex) {
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }
}

module.exports = {
    login
}