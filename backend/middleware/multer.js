import multer from 'multer';

// Use memory storage for Cloudinary uploads (works on serverless/Render)
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: function (req, file, callback) {
        // Accept images only
        if (!file.mimetype.startsWith('image/')) {
            return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
    }
});

export default upload;