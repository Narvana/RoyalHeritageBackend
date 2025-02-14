const Guest=require('../model/guests.model');
const {uploadToFirebase}=require('../middleware/ImageUpload/firebaseConfig');
const ApiError=require('../utils/ApiResponse/ApiError');
const ApiSuccess=require('../utils/ApiResponse/ApiSuccess');

const AddGuest = async(req,res,next)=>{

    const {guestName,aboutGuest} = req.body;

    let guestImagelink = null;

    try {
        if(req.file)
        {
            guestImagelink=await uploadToFirebase(req.file);
        }
        else{
            return next(ApiError(400,'No Image Provide of guest'));
        }
        
            const GuestObject= new Guest({
                guestName,
                aboutGuest,
                guestImage:guestImagelink
            });
        
            const GuestData = await GuestObject.save();
        
            return next(ApiSuccess(200, GuestData,'Guest is added'));
                
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


const getGuest = async(req,res,next)=>{

    try {
        const guestList=await Guest.find();
        const guestCount=guestList.length;
        if(guestCount === 0)
        {
            return next(ApiError(400,'Guest List is empty please add some guest'));
        }
        return next(ApiSuccess(200,guestList,`Guest List. Count-:${ guestCount}`))
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


const updateGuest= async(req,res,next)=>{

    const {id} = req.query;

    const {guestName,aboutGuest} = req.body;
    // 
    let guestImagelink

    try 
    {
        if(req.file)
        {
            guestImagelink = null;
            guestImagelink=await uploadToFirebase(req.file);
        }
        else if(!req.file && !guestName && !aboutGuest){
            return next(ApiError(400,'No input field provided, nothing to updated'))
        }

        const updatedGuestData = {
            guestName,
            aboutGuest,
            guestImage: guestImagelink
        };
        
        const updatedGuest = await Guest.findByIdAndUpdate(id, 
            { 
                $set: updatedGuestData 
            }, 
            { 
                new: true,
                runValidators: true 
            }
        );
    
        return next(ApiSuccess(200, updatedGuest,'Guest is updated'));
                
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

const deleteGuest= async(req,res,next)=>{

    const {id} = req.query;

    try 
    {
        await Guest.findByIdAndDelete(id);
    
        return next(ApiSuccess(200, [],'Guest is Removed'));
                 
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
    AddGuest,
    getGuest,
    updateGuest,
    deleteGuest
}