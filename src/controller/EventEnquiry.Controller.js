require('dotenv').config();

const axios=require('axios');
const ApiError=require('../utils/ApiResponse/ApiError');
const ApiSuccess=require('../utils/ApiResponse/ApiSuccess');
const {uploadToFirebase} = require('../middleware/ImageUpload/firebaseConfig');
const eventEnquiry=require('../model/EventEnquiry.model');

const AddEventEnquiry=async(req,res,next)=>{

    const {EnquiryName,EnquiryContact,EnquiryEmail,EnquiryMessage, eventType, eventDate, guestNo, watNum, watMsg}=req.body;

    try {
        if(!watNum || !watMsg)
        {
            return next(ApiError(400,`Provide a Royal Heritage Number and Message both`));
        } 
        else
        {
            const regex = /^[1-9][0-9]{9}$/; // Changed to 
            if (regex.test(watNum) === false) {
                return next(ApiError(400, 'Provide a 10 digit Number for watNum'));
            }
        }

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
            const sendMessage = {
                api_key: 'API-X-332433606617278301336824731-P-API',
                phone: `91${watNum}`,
                message: `${watMsg}`
                };
            axios.post('https://phone.watverifyapi.live/send-wa-message/post', sendMessage, {
            headers: {
                'Content-Type': 'application/json'
            }
            })
            .then(response => {
            console.log('Message sent successfully:', response.data);
            }) 
            .catch(error => {
            console.error('Error sending message:', error.response ? error.response.data : error.message);
            });
                
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