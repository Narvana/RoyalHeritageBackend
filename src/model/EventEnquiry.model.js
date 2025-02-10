const mongoose = require('mongoose')
const validator=require('validator')

const eventEnquirySchema=new mongoose.Schema(
    {
        EnquiryName:{
            type:String,
            required:[true,'Enquiry Name is required']
        },
        EnquiryContact:{
            type:String,
            required:[true,'Enquiry Contact is required'],
            validate: {
                validator: function(value) {
                    return /^[1-9][0-9]{9}$/.test(value);
                },
                message: 'Phone number must be 10 digits long and cannot start with 0 and should have no string.'
            }
    
        },
        EnquiryEmail:{
            type:String,
            required:[true,'Enquiry Email field is required'],
            trim:true,
            validate:{
                validator(value){
                    if(!validator.isEmail(value)){
                        throw new Error("Write a Valid Email")
                    }    
                } 
            }
        },
        EnquiryMessage:{
            type:String,
            required:[true,'Enquiry Message is required'],
            min:0,
            max:500
        },
        eventType: {
            type: String,
            required: [true, 'Event Type is required'],
            // enum: {
            //     values: ['Wedding', 'Birthday', 'Corporate','Haldi', 'Other'],
            //     message: '{VALUE} is not a valid Event Type.'
            // },
        },     
        eventDate: {
            type: Date,
            required: [true, 'Event Date is required'],
            validate: {
                validator: function (value) {
                    // Ensure CheckIn date is not in the past
                    return value >= new Date();
                },
                message: 'Check In date must be today or a future date.',
            },
        },
        guestNo:{
            type:Number,
            required:[true,'Guest Count is required'],
            min:0,
            max:2000
        },
        
})

const eventEnquiry= mongoose.model('EventEnquiry',eventEnquirySchema)

module.exports=eventEnquiry;


