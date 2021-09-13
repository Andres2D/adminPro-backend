const { response } = require('express');

const getAll = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'All works'
    });
}

module.exports = {
    getAll
}