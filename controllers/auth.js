const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { getMenuFrontend } = require('../helpers/menu-frontend');

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
                msg: 'Invalid password'
            });
        }

        // Generate Token - JWT
        const token = await generateJWT(userDB._id);

        res.json({
            ok: true,
            token,
            menu: getMenuFrontend(userDB.role)
        })
    } catch(ex) {
        console.log('in');
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }
}

const googleSignIn = async(req, res = response) => {
    const googleToken = req.body.token;
    try {
        const {name, email, picture}  = await googleVerify(googleToken);
        const userDB = await User.findOne({email});
        let user;
        if(!userDB) {
            user = new User({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        } else {
            user = userDB;
            user.google = true;
        }

        // Save on DB
        await user.save();

        // Generate Token - JWT
        const token = await generateJWT(user._id);

        res.json({
            ok: true,
            token,
            menu: getMenuFrontend(user.role)
        });
    } catch(ex) {
        console.log(ex);
        res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        });
    }
}

const renewToken = async(req, res = response) => {
    const _id = req._id;
    const user = await User.findById(_id);

    // Generate Token - JWT
    const token = await generateJWT(_id);

    res.json({
        ok: true,
        token,
        user,
        menu: getMenuFrontend(user.role)
    })
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}