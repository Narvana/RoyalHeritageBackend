require('dotenv').config();

const ApiError=require('../utils/ApiResponse/ApiError');
const ApiSuccess=require('../utils/ApiResponse/ApiSuccess');
const {uploadToFirebase} = require('../middleware/ImageUpload/firebaseConfig');
const About=require('../model/About.model');

const AboutImgUpload=async(req,res,next)=>{
    let imageURL = [];
    let uploadResult;
    let link;
    let aboutIMG;  
    let data;


    try {          
        if(req.file) 
        {
            uploadResult = await uploadToFirebase(req.file);
            link = uploadResult;
            aboutIMG = link;            
        }
        else {
            console.log('No About Image Provide');
            return next(ApiError(400,'No About Image Provide'));
        }
        const AboutCheck = await About.findOne();
        
        if(AboutCheck)
        {
            AboutCheck.AboutImage = aboutIMG;           
            data = await AboutCheck.save();
            return next(ApiSuccess(200,data,'About Image Updated'));
        }  
        else
        {
            Aboutsave=new About({
                AboutImage : aboutIMG
            });
            data = await Aboutsave.save();
            return next(ApiSuccess(200,data,'About Image Added'));
        }
    } catch (error) 
    {
        console.log(
            {
            'Internal Serve Error, ' : error.message,
            error
            }
        );
            
        if(error.name === 'ValidationError')
        {
            const errorMessages = Object.values(error.errors).map(error => error.message);
            return next(ApiError(500,errorMessages[0]));
        }
        return next(ApiError(500, `Internal Server Error: ${error.message}`));
    }   
}


const ViewAboutImg = async(req,res,next) => {
    
    try {
        const ViewAbout= await About.findOne();
        if(ViewAbout)
        {
            return next(ApiSuccess(200,ViewAbout,'About Image'));
        }
        return next(ApiError(400, `No About Image found`));   
        
    } catch (error) {
        console.log(
            {
            'Internal Serve Error, ' : error.message,
            error
            }
        );
        return next(ApiError(500, `Internal Server Error: ${error.message}`));   
    }

}

const RemoveAboutImg = async(req,res,next)=>{
    const {id}=req.query;
    try {
        if(!id)
        {
            return next(ApiError(400,'Please Provide image ID'));
        }
        const AboutCheck=await About.findByIdAndDelete(id);
        if(AboutCheck)
        {
            return next(ApiSuccess(200,[],'About Image Removed'));
        }
        return next(ApiError(400,'No Image found with provided ID.'));
    } catch (error) {
        console.log(
            {
            'Internal Serve Error, ' : error.message,
            error
            }
        );
        return next(ApiError(500, `Internal Server Error: ${error.message}`));   
    }
}

module.exports={
    AboutImgUpload,
    ViewAboutImg,
    RemoveAboutImg
}


