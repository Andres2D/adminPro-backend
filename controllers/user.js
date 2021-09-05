const User = require('../models/user');
const { response } = require('express')

const getUsers = async(req, res) => {
    const users = await User.find({}, 'name email role google');
    res.json({
        ok: true,
        users
    });
}

const createUsers = async(req, res = response) => {
    const { email, password, name} = req.body;
    try {
        const existEmail = await User.findOne({email});

        if(existEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'The email is currently used by another user'
            })
        }

        const user = new User(req.body);
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

module.exports = {
    getUsers,
    createUsers
}