require('dotenv').config();

const ApiError=require('../utils/ApiResponse/ApiError');
const ApiSuccess=require('../utils/ApiResponse/ApiSuccess');
const {uploadToFirebase, uploadBase64ToFirebase} = require('../middleware/ImageUpload/firebaseConfig');
const roomsImages=require('../model/Rooms.Images.model');
const { ObjectId } = require('mongodb');

const AddRoomImage=async(req,res,next)=>{
    const {base64Deluxe,base64Executive,base64Maharaja,base64Suite,RoomImageData} = req.body;
    let imageURLDeluxe=[];
    let imageURLExecutive=[]
    let imageURLMaharaja=[]
    let imageURLSuite=[]
    let link;
    let uploadResult;
    
    try {
        const RoomsImages = await roomsImages.findOne();
        const RoomsID=new ObjectId(RoomsImages?._id);
        const id = RoomsID.toString();        
        // return console.log(id);
         
        if(RoomsImages)
        { 
            if(base64Deluxe && base64Deluxe.length>0 )
            {
                await Promise.all(
                    base64Deluxe.map(async (file)=>{
                        uploadResult = await uploadBase64ToFirebase(file);                        
                        link = uploadResult;
                        imageURLDeluxe.push(link);
                    })
                )
                // Image= 'Deluxe';
            }if(base64Executive && base64Executive.length > 0)
            {
                await Promise.all(
                    base64Executive.map(async (file)=>{
                        
                        uploadResult = await uploadBase64ToFirebase(file);
                        link = uploadResult; 
                        imageURLExecutive.push(link);
                    })
                )
                // Image='Executive';
            }if(base64Maharaja && base64Maharaja.length > 0)
            {
                await Promise.all(
                    base64Maharaja.map(async (file)=>{
                        uploadResult = await uploadBase64ToFirebase(file);
                        link = uploadResult; 
                        imageURLMaharaja.push(link);
                    })
                )
                // Image='Maharaja';
            }if(base64Suite && base64Suite.length > 0)
            {     
                await Promise.all(
                    base64Suite.map(async (file)=>{
                        uploadResult = await uploadBase64ToFirebase(file);
                        link = uploadResult; 
                        imageURLSuite.push(link);
                    })
                )
            }
            const DeluxeUpdate=[...RoomImageData.Deluxe,...imageURLDeluxe];
            const ExecutiveUpdate=[...RoomImageData.Executive,...imageURLExecutive];
            const MaharajaUpdate=[...RoomImageData.Maharaja,...imageURLMaharaja];
            const SuiteUpdate=[...RoomImageData.Suite,...imageURLSuite];

            const updateRoomsImages= await roomsImages.findByIdAndUpdate(
                id,
                {
                    $set: {
                        Deluxe:DeluxeUpdate,
                        Executive:ExecutiveUpdate,
                        Maharaja:MaharajaUpdate,
                        Suite:SuiteUpdate
                    }   
                },
                {
                    new: true
                    // runValidators: !needsComplexUpdate, // Skip validation if it has already been done
                }
             );
            //  console.log({updateRoomsImages});

            return next(ApiSuccess(200,updateRoomsImages,'Images updated'));
        }
        else
        {
            let ImageAdded=false;
            if(base64Deluxe && base64Deluxe.length>0 )
            {
                await Promise.all(
                    base64Deluxe.map(async (file)=>{
                        uploadResult = await uploadBase64ToFirebase(file);                        
                        link = uploadResult;
                        imageURLDeluxe.push(link);
                    })
                )
                ImageAdded=true;
            }if(base64Executive && base64Executive.length > 0)
            {
                await Promise.all(
                    base64Executive.map(async (file)=>{
                        
                        uploadResult = await uploadBase64ToFirebase(file);
                        
                        link = uploadResult; 
                        imageURLExecutive.push(link);
                    })
                )
                ImageAdded=true;
            }if(base64Maharaja && base64Maharaja.length > 0)
            {
                await Promise.all(
                    base64Maharaja.map(async (file)=>{
                        uploadResult = await uploadBase64ToFirebase(file);
                        link = uploadResult; 
                        imageURLMaharaja.push(link);
                    })
                )
                ImageAdded=true;
            }if(base64Suite && base64Suite.length > 0)
            {     
                await Promise.all(
                    base64Suite.map(async (file)=>{
                        uploadResult = await uploadBase64ToFirebase(file);
                        link = uploadResult; 
                        imageURLSuite.push(link);
                    })
                )
                ImageAdded=true;
            }
            if(ImageAdded === false)
            {
                return next(ApiError(400, `Please Upload image of any Deluxe, Executive , Maharaja or Suite`));   
            }
        
            const ImageSave= new roomsImages({
                Deluxe: imageURLDeluxe,
                Executive: imageURLExecutive,
                Maharaja: imageURLMaharaja,
                Suite: imageURLSuite
            });
        
            const ImageSaved = await ImageSave.save();

            return next(ApiSuccess(200,ImageSaved,'Images Added Successfully'))
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

const GetRoomImage=async(req,res,next)=>{
    const {type}=req.query;

    try {
        const RoomsImages = await roomsImages.findOne();
        let RoomSearch
        if(!RoomsImages)
        {
            return next(ApiError(400,`No Room Images found`));   
        }
        if(type && type === 'Deluxe')
        {
            RoomSearch=RoomsImages.Deluxe;
            return next(ApiSuccess(200,{Deluxe:RoomSearch},`${type} Rooms Images Found`));   
        }else if(type && type === 'Executive')
        {
            RoomSearch=RoomsImages.Executive;
            return next(ApiSuccess(200,{Executive:RoomSearch},`${type} Rooms Images Found`));   
        }else if(type && type === 'Maharaja')
        {
            RoomSearch=RoomsImages.Maharaja;
            return next(ApiSuccess(200,{Maharaja:RoomSearch},`${type} Rooms Images Found`));   
        }else if(type && type === 'Suite')
        {
            RoomSearch=RoomsImages.Suite;
            return next(ApiSuccess(200,{Suite:RoomSearch},`${type} Rooms Images Found`));   
        }
        return next(ApiSuccess(200,RoomsImages,'Rooms Images Found'));        
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
    AddRoomImage,
    GetRoomImage
}

