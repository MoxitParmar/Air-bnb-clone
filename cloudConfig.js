const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// by default naming convention required
// giving the credentials to cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "theWeeknd_DEV",
    allowedFormats: ["png", "jpg", "jpeg"],
  },
});

//we require this export in listing.js routes
module.exports = {
  cloudinary,
  storage,
};
