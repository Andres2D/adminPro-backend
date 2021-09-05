const User = require('../models/user');
const { response } = require('express');
const bcrypt = require('bcryptjs');

const getUsers = async(req, res) => {
    const users = await User.find({}, 'name email role google');
    res.json({
        ok: true,
        users
    });
}

const createUsers = async(req, res = response) => {
    const { email, password } = req.body;
    try {
        const existEmail = await User.findOne({email});

        if(existEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'The email is currently used by another user'
            })
        }

        const user = new User(req.body);

        // Crypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        // Save user
        await user.save();
        res.json({
            ok: true,
            user
        });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error, review logs'
        })
    }
}

const updateUser = async (req, res = response) => {
    // TODO: Validate token if is the correct user
    const _id = req.params.id;
    try {
        const userDB = User.findById(_id);

        if(!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'User dont exist'
            });
        }

        const fields = req.body;
        if(userDB.email === req.body.email) {
            delete fields.email;
        } else {
            const emailExist = await User.findOne({email: req.body.email});
            if(emailExist) {
                res.status(400).json({
                    ok: false,
                    msg: 'The email is currently used by another user'
                })
            }
        }

        // Updating∫
        delete fields.password;
        delete fields.google;

        const userUpdated = await User.findByIdAndUpdate(_id, fields, {new: true});

        res.json({
            ok: true,
            user: userUpdated
        })
    } catch(ex) {
        console.log(ex);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });
    }
}

module.exports = {
    getUsers,
    createUsers,
    updateUser
}