const { response, json } = require('express');
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

const getDoctor = async(req, res = response) => {
    const _id = req.params.id;
    try {
        const doctor = await Doctor.findById(_id)
                                    .populate('user', 'name img')
                                    .populate('hospital', 'name img');
    
        res.json({
            ok: true,
            doctor
        });
    } catch(ex) {
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }

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

const updateDoctors = async(req, res = response) => {

    const id = req.params.id;
    const _id = req._id;

    try {
        const doctor = await Doctor.findById(id);
        if(!doctor) {
            res.status(400).json({
                ok: false,
                msg: 'Doctor don´t found'
            })
        }
        const doctorChanges = {
            ...req.body,
            user: _id
        }
        const doctorUpdated = await Doctor.findByIdAndUpdate(id, doctorChanges, {new: true});
        res.json({
            ok: true,
            doctor: doctorUpdated
        });

    } catch(err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });
    }
}

const deleteDoctors = async(req, res = response) => {
    const id = req.params.id;

    try {
        const doctor = await Doctor.findById(id);
        if(!doctor) {
            res.status(400).json({
                ok: false,
                msg: 'Doctor don´t found'
            })
        }

        await Doctor.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Doctor deleted'
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
    getDoctors,
    createDoctors,
    updateDoctors,
    deleteDoctors,
    getDoctor
}
