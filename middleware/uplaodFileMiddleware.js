import multer from "multer";

// multer configuration

const storageConfig = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        const name = Date.now() + file.originalname;
        cb(null, name);
    }
});

export const uploadFile = multer({ storage: storageConfig });