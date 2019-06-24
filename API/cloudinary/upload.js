//This endpoint will be merged into the updated create post endpoint once that update is complete.
//This is primarily for testing purposes.
const multer = require("multer");

const router = require("express").Router();
//Bringing in cloudinary settings and middlewares.
const { cloudinaryConfig, uploader } = require("./cloudConfig.js");
const { multerUploads, dataUri } = require("./multer.js");
cloudinaryConfig(router);

//Upload Image Endpoint
router.post("/upload", multerUploads, (req, res) => {
  console.log("REQUEST FILE", req.file);
  if (req.file) {
    const file = dataUri(req).content;
    return uploader
      .upload(file, { use_filename: true })
      .then(result => {
        console.log("RESULT", result);
        const img_url = result.secure_url;
        return res.status(200).json({
          message: "The image has been successfully uploaded to Cloudinary.",
          img_url: { img_url },
          img_id: result.public_id
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err.message,
          message: "An error occurred while processing this request."
        });
      });
  } else {
    res.status(500).json({ message: "No Req.file" });
  }
});

module.exports = router;
