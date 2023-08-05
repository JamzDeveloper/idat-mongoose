const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/image"),
  filename: (req, file, cb) => {
    let extension = Date.now() + "-image-" + file.originalname;
    cb(null, extension);

    req.body.avatar = `${extension}`;
  },
});

const uploadImage = multer({ storage: storage }).single("avatar");

module.exports = uploadImage;
