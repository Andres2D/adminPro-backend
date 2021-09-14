const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const updateIamge = require('../helpers/update-image');
const fileUpload = (req, res = response) => {
    const type = req.params.type;
    const id = req.params.id;
    const validTypes = ['hospitals', 'users', 'doctors'];

    if( !validTypes.includes(type)){
        return res.status(400).json({
            ok: false,
            msg: 'Incorrect type file'
        });
    }

    // Validating the file exist
    if(!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'There is not file'
        });
    }

    // Process the image
    const file = req.files.image;
    const splitName = file.name.split('.');
    const fileExtension = splitName[splitName.length - 1];

    // Validate extensions
    const validExtensions = ['png','jpg','jpeg','gif'];

    if(!validExtensions.includes(fileExtension)) {
        return res.status(400).json({
            ok: false,
            msg: 'Invalid extension file'
        });
    }

    // Generate the fileName
    const fileName = `${uuidv4()}.${fileExtension}`;

    // Path to save the image
    const path = `./uploads/${type}/${fileName}`;
    // Move the image
    file.mv(path, function(err) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error uploading the image'
            });
        }

        // Update the database
        updateIamge(type, id, fileName);
        res.json({
            ok: true,
            msg: 'File uploaded',
            fileName
        })
    });
}

module.exports = {
    fileUpload
}