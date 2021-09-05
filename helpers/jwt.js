const jwt = require('jsonwebtoken');

const generateJWT = (_id) => {

    return new Promise((resolve, reject) => {
        const payload = {
            _id
        }
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {
            if(err) {
                console.log(err);
                reject('JWT can`t be generated')
            }else{
                resolve(token);
            }
        })
    });
}

module.exports = {
    generateJWT
}