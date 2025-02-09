require('dotenv').config();

const ApiError=require('../utils/ApiResponse/ApiError');
const ApiSuccess=require('../utils/ApiResponse/ApiSuccess');
const {uploadToFirebase} = require('../middleware/ImageUpload/firebaseConfig');
const roomEnquiry = require('../model/roomEnquiry.model');
// const Banner = require('../model/Banner.model');


const AddRoomEnquiry=async(req,res,next)=>{

    const {EnquiryName, EnquiryContact, EnquiryEmail,roomType,CheckIn,CheckOut,Adult,Child,RoomCount}=req.body;

    try {
        const AddRoom=new roomEnquiry({
            EnquiryName, 
            EnquiryContact, 
            EnquiryEmail,
            roomType,
            CheckIn,
            CheckOut,
            Adult,
            Child,
            RoomCount
        });

        data=await AddRoom.save();
        if(data)
        {
            return next(ApiSuccess(200,data,'Room Enquiry Added'))
        }
        return next(ApiError(400,'Room Enquiry Not Added. Some issue might occur'))
    } catch (error) {
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

const GetRoomEnquiry=async(req,res,next)=>{
    try {
        const getRoom=await roomEnquiry.find();
        if(getRoom.length > 0)
        {
            return next(ApiSuccess(200,getRoom,'Enquiry Room List'));
        }
        return next(ApiError(400,'No Room Enquiry'));
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

const removeRoom=async(req,res,next)=>{
    const {id} = req.query;
    if(!id)
    {
        return next(ApiError(400,'Please provide room id for enquiry'));
    }
    try {
        const getRoom=await roomEnquiry.findByIdAndDelete(id);
        if(getRoom)
        {
            return next(ApiSuccess(200,[],'Enquiry Removed'));
        }
        return next(ApiError(400,'No Room Enquiry found'));
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
    AddRoomEnquiry,
    GetRoomEnquiry,
    removeRoom
}