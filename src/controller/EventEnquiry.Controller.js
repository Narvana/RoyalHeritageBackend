require('dotenv').config();

const ApiError=require('../utils/ApiResponse/ApiError');
const ApiSuccess=require('../utils/ApiResponse/ApiSuccess');
const {uploadToFirebase} = require('../middleware/ImageUpload/firebaseConfig');
const eventEnquiry=require('../model/EventEnquiry.model');

const AddEventEnquiry=async(req,res,next)=>{

    const {EnquiryName,EnquiryContact,EnquiryEmail,EnquiryMessage,eventType,eventDate,guestNo}=req.body;

    try {
        const AddEvent=new eventEnquiry({
            EnquiryName, 
            EnquiryContact, 
            EnquiryEmail,
            EnquiryMessage,
            eventType,
            eventDate,
            guestNo
        });

        data=await AddEvent.save();
        if(data)
        {
            return next(ApiSuccess(200,data,'Event Enquiry Added'))
        }
        return next(ApiError(400,'Event Enquiry Not Added. Some issue might occur'))
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

const GetEventEnquiry=async(req,res,next)=>{
    try {
        const getEvent=await eventEnquiry.find();
        if(getEvent.length > 0)
        {
            return next(ApiSuccess(200,getEvent,'Event Enquiry List'));
        }
        return next(ApiError(400,'No Event Enquiry'));
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

const removeEvent=async(req,res,next)=>{
    const {id} = req.query;
    if(!id)
    {
        return next(ApiError(400,'Please provide Event id for enquiry'));
    }
    try {
        const getEvent=await eventEnquiry.findByIdAndDelete(id);
        if(getEvent)
        {
            return next(ApiSuccess(200,[],'Event Enquiry Removed'));
        }
        return next(ApiError(400,'No Event Enquiry found with provided id'));
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
    AddEventEnquiry,
    GetEventEnquiry,
    removeEvent
}