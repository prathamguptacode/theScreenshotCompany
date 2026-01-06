import { v2 as cloudinary } from 'cloudinary';

const cloudname = process.env.KEY_NAME;
const key = process.env.API_KEY;
const secret = process.env.API_SECRET;

if (cloudname && key && secret) {
    cloudinary.config({
        cloud_name: cloudname,
        api_key: key,
        api_secret: secret,
        secure: true,
    });
} else {
    console.error('cloudinary keys not found');
}

export default cloudinary

