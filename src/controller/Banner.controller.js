require('dotenv').config();

const ApiError=require('../utils/ApiResponse/ApiError');
const ApiSuccess=require('../utils/ApiResponse/ApiSuccess');
const {uploadToFirebase} = require('../middleware/ImageUpload/firebaseConfig');
const Banner = require('../model/Banner.model');


const BannerUpload=async(req,res,next)=>{
    let imageURL = [];
    let uploadResult;
    let link;
    let bannerIMG;  
    let data;


    try {  
        if(req.file) 
        {
            uploadResult = await uploadToFirebase(req.file);
            link = uploadResult;
            bannerIMG = link;            
        }
        else {
            console.log('No Banner Image Provide');
            return next(ApiError(400,'No Banner Image Provide'));
        }
        const BannerCheck = await Banner.findOne();
        
        if(BannerCheck)
        {
            BannerCheck.BannerImage = bannerIMG;           
            data = await BannerCheck.save();
            return next(ApiSuccess(200,data,'Banner Image Updated'));
        }  
        else
        {
            Bannersave=new Banner({
                BannerImage : bannerIMG
            });
            data = await Bannersave.save();
            return next(ApiSuccess(200,data,'Banner Image Added'));
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


const ViewBanner = async(req,res,next) => {
    
    try {
        const ViewBanner= await Banner.findOne();
        if(ViewBanner)
        {
            return next(ApiSuccess(200,ViewBanner,'Banner Image'));
        }
        return next(ApiError(400, `No Banner Image found`));   
        
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

const RemoveBanner = async(req,res,next)=>{
    const {id}=req.query;
    try {
        if(!id)
        {
            return next(ApiError(400,'Please Provide ID'));
        }

        const BannerCheck=await Banner.findByIdAndDelete(id);
        if(BannerCheck)
        {
            return next(ApiSuccess(200,[],'Banner Image Removed'));
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
    BannerUpload,
    ViewBanner,
    RemoveBanner
}


