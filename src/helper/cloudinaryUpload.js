import cloudinary from '../config/cloudinary.js';
import fs from 'fs-extra';

const uploadImage = async (filePath) => {

    const result = await cloudinary.uploader.upload(filePath, {
        folder: "projectImages"
    });

    await fs.remove(filePath);

    return result;
};

export { uploadImage };