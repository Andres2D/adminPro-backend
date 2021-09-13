const { response } = require('express');
const Doctor = require('../models/doctor');

const getDoctors = async(req, res = response) => {
    const doctors = await Doctor.find()
                                .populate('user', 'name img')
                                .populate('hospital', 'name img')
    res.json({
        ok: true,
        doctors
    })
}

const createDoctors = async(req, res = response) => {
    const _id = req._id;
    const doctor = new Doctor({
        user: _id,
        ... req.body
    });
    try {
        const doctorDb = await doctor.save();
        res.json({
            ok: true,
            doctor: doctorDb
        });
    } catch(ex) {
        console.log(ex);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }
}

const updateDoctors = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Update doctors'
    })
}

const deleteDoctors = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Delete doctors'
    })
}

module.exports = {
    getDoctors,
    createDoctors,
    updateDoctors,
    deleteDoctors
}
