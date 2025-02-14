const mongoose =require('mongoose');
// const validator = require('validator');

const guestSchema = new mongoose.Schema(
    {
   
    aboutGuest:{
        type:String,
        required:[true,'About Guest field is required'],
        maxLength:[100,"About Guest can't be more than 100 character"]
    },
    guestName:{
        type:String,
        required:[true,'Guest Name is required'],
        maxLength:[50,"Guest Name can't be more than 50 character"]
    }, 
    guestImage:{
        type:String,
        required:[true,'Guest Image is required']
    }
},
{
    timestamps:true
})

const Guest=mongoose.model('Guest',guestSchema);

module.exports=Guest;