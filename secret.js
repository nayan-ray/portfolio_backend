import 'dotenv/config'



const Mongo_connect_url = process.env.ATLAS_URL;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const SECRET_KEY = process.env.ADMINTOKEN_SECRET_KEY;

export { Mongo_connect_url, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, SECRET_KEY };