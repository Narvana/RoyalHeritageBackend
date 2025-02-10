const mongoose = require('mongoose');
const validator=require('validator');

const roomsImagesSchema=new mongoose.Schema(
    {
        Deluxe:{
            type:[String]
        },
        Executive:{
            type:[String]
        },
        Maharaja:{
            type:[String]
        },
        Suite:{
            type:[String]
        }
}
)

// roomSchema.index({ property: 1, roomNum: 1 }, { unique: true });


const roomsImages= mongoose.model('RoomsImages',roomsImagesSchema)

module.exports=roomsImages;


