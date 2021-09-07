const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitals = (req, res) => {
    res.json({
        ok: true,
        msg: 'Get hospitals'
    })
}

const createHospitals = async(req, res) => {
    const _id = req._id;
    const hospital = new Hospital({
        user: _id,
        ... req.body
    });
    try {
        const hospitalDB = await hospital.save();
        res.json({
            ok: true,
            hospital: hospitalDB
        })
    } catch(ex) {
        console.log(ex);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }
}

const updateHospitals = (req, res) => {
    res.json({
        ok: true,
        msg: 'Update hospitals'
    })
}

const deleteHospitals = (req, res) => {
    res.json({
        ok: true,
        msg: 'Delete hospitals'
    })
}

module.exports = {
    getHospitals,
    createHospitals,
    updateHospitals,
    deleteHospitals
}
