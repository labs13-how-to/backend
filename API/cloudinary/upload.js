//This endpoint will be merged into the updated create post endpoint once that update is complete.
//This is primarily for testing purposes.

const router = require("express").Router();
//Bringing in cloudinary settings and middlewares.
const { cloudinaryConfig, uploader } = require('./cloudConfig.js');
const { multerUploads, dataUri } = require('./multer.js');
cloudinaryConfig(router);

//Upload Image Endpoint
router.post("/upload", multerUploads, (req, res) => {
    if(req.file) {
        const file = dataUri(req).content;
        return uploader.upload(file).then(result => {
            const img_url = result.url;
            return res.status(200).json({ message: "The image has been successfully uploaded to Cloudinary.", img_url: { img_url }})
        })
        .catch(err => {
            res.status(500).json({ message: "An error occurred while processing this request."})
        });
    };
});

module.exports = router;