import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
import fs from "fs";
config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (localpath) => {
  try {
    if (!localpath) return;

    const result = await cloudinary.uploader.upload(localpath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localpath);

    return result.secure_url;
  } catch (err) {
    fs.unlinkSync(localpath);
    console.error("Upload failed:", err);
  }
};

export default uploadImage;
