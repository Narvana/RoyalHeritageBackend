const cloudinary = require('cloudinary').v2;
// require('dotenv').config();
const fs=require('fs');
cloudinary.config({
    cloud_name: "douuxmaix", 
    api_key: "343419412862917", 
    api_secret: "K9ajO5vo3tupeZWoitwNCi_Kq7U" 
});
    
const uploadOnCloudinary=async (localFilePath)=>{
    try {
        if(!localFilePath) 
        {
            // return null
            console.log("no file path");
        }
        const response= await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        // console.log("File is uploaded on Cloudinary", response.url);
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null;
    }
}

const uploadBase64OnCloudinary = async (base64String) => {
    try {
        if (!base64String) {
            console.log("No base64 string provided");
            return null;
        }

        const response = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64String}`, {
            resource_type: "auto"
        });
        
        return response.secure_url; // Return the Cloudinary secure URL
    } catch (error) {
        console.error("Error while uploading base64 to Cloudinary", error);
        return null; // Handle error and return null
    }
}

module.exports = {
    uploadOnCloudinary,
    uploadBase64OnCloudinary
};