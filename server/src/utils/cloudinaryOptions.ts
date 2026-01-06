import type { UploadApiOptions } from "cloudinary";

const options: UploadApiOptions = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: 'theScreenshotCompany',
    quality:'auto:eco',
};
export default options;
