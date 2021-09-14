const User = require('../models/user'); 
const Hospital = require('../models/hospital'); 
const Doctor = require('../models/doctor'); 
const fs = require('fs');

const deleteImage = (path) => {
    if(fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}

const updateIamge = async(type, id, fileName) => {
    let oldPath = '';
    switch (type) {
        case 'doctors':
            const doctor = await Doctor.findById(id);
            if(!doctor) {
                console.log('Doctor don´t found');
                return false;
            }
            oldPath = `./uploads/doctors/${doctor.img}`;
            deleteImage(oldPath);
            doctor.img = fileName;
            await doctor.save();
            return true;
        break;
        case 'users':
            const user = await User.findById(id);
            if(!user) {
                console.log('User don´t found');
                return false;
            }
            oldPath = `./uploads/users/${user.img}`;
            deleteImage(oldPath);
            user.img = fileName;
            await user.save();
            return true;
        break;
        case 'hospitals':
            const hospital = await Hospital.findById(id);
            if(!hospital) {
                console.log('Hospital don´t found');
                return false;
            }
            oldPath = `./uploads/hospitals/${hospital.img}`;
            deleteImage(oldPath);
            hospital.img = fileName;
            await hospital.save();
            return true;
        break;
        default:
            break;
    }
}

module.exports = updateIamge;