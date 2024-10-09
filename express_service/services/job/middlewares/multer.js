const multer = require('multer');

const configs = {
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/gif',
        ];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else cb({ status: 400, message: 'Invalid file type' }, false);
    },
};

module.exports = multer(configs);
