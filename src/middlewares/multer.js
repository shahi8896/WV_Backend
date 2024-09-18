import multer from "multer";
const storage = multer.diskStorage({
    destination: function (req, // Explicitly type the req parameter
    file, // Explicitly type the file parameter
    cb // Explicitly type the callback parameter
    ) {
        cb(null, "./public/temp");
    },
    filename: function (req, // Explicitly type the req parameter
    file, // Explicitly type the file parameter
    cb // Explicitly type the callback parameter
    ) {
        cb(null, file.originalname);
    },
});
export const upload = multer({
    storage,
});
