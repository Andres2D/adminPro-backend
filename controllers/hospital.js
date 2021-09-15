const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitals = async(req, res) => {
    const hospitals = await Hospital.find()
                                    .populate('user', 'name img');
    res.json({
        ok: true,
        hospitals
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

const updateHospitals = async(req, res = response) => {
    const id = req.params.id;
    const _id = req._id;

    try {
        const hospital = await Hospital.findById(id);

        if(!hospital) {
            return res.status(400).json({
                ok: false,
                msg: 'Hospital don´t found'
            });
        }
        const hospitalChanges = {
            ...req.body,
            user: _id
        }
        
        const hospitalUpdated = await Hospital.findByIdAndUpdate(id, hospitalChanges, {new: true});

        res.json({
            ok: true,
            hospital: hospitalUpdated
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });
    }
}

const deleteHospitals = async(req, res = response) => {
    const id = req.params.id;

    try {
        const hospital = await Hospital.findById(id);

        if(!hospital) {
            return res.status(400).json({
                ok: false,
                msg: 'Hospital don´t found'
            });
        }
        
        await Hospital.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Hospital deleted'
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });
    }
}

module.exports = {
    getHospitals,
    createHospitals,
    updateHospitals,
    deleteHospitals
}
