const mongoose = require('mongoose')
const validator=require('validator')

const roomEnquirySchema=new mongoose.Schema(
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
            // unique:true,
            validate:{
                validator(value){
                    if(!validator.isEmail(value)){
                        throw new Error("Write a Valid Email")
                    }    
                } 
            }
        },
        roomType: {
            type: String,
            required: [true, 'Room Type is required'],
            enum: {
                values: ['Delux', 'Executive', 'Maharaja', 'Suite'],
                message: '{VALUE} is not a valid Room Type.'
            },
        },     
        CheckIn: {
            type: Date,
            required: [true, 'Check In Time is required'],
            validate: {
                validator: function (value) {
                    // Ensure CheckIn date is not in the past
                    return value >= new Date();
                },
                message: 'Check In date must be today or a future date.',
            },
        },
        CheckOut:{
            type: Date,
            required:[true,'Check Out Time is required'],
            validate: {
                    validator: function (value) {
                        // Check if CheckIn date is before CheckOut date
                        return this.CheckIn < value;
                    },
                    message: 'CheckOut date must be later than CheckIn date',
                },        
        },
        Adult:{
            type:Number,
            required:[true,'Adult Count is required'],
            min:0,
            max:500
        },
        Child:{
            type:Number,
            required:[true,'Child Count is required'],
            min:0,
            max:500
        },
        RoomCount:{
            type:Number,
            required:[true,'Room Count is required'],
            min:0,
            max:100
        }

})

// roomSchema.index({ property: 1, roomNum: 1 }, { unique: true });


const roomEnquiry= mongoose.model('RoomEnquiry',roomEnquirySchema)

module.exports=roomEnquiry;


