require('dotenv').config();

const ApiError=require('../utils/ApiResponse/ApiError');
const ApiSuccess=require('../utils/ApiResponse/ApiSuccess');
const {uploadToFirebase} = require('../middleware/ImageUpload/firebaseConfig');
const roomEnquiry = require('../model/roomEnquiry.model');
const axios = require('axios');

// const Banner = require('../model/Banner.model');


const AddRoomEnquiry=async(req,res,next)=>{

    const {EnquiryName, EnquiryContact, EnquiryEmail, roomType, CheckIn, CheckOut, Adult, Child, RoomCount, watNum, watMsg}=req.body;
    
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

        data = await AddRoom.save();

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
            return next(ApiSuccess(200,data,'Room Enquiry Added'))
        }else{
            return next(ApiError(400,'Room Enquiry Not Added. Some issue might occur'))
        }

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