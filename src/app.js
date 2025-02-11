require('dotenv').config();
require('./DB/Royal.DB');

const express = require('express')
const app=express()

const helmet = require('helmet')
const cors=require('cors')
const cookieParser=require('cookie-parser')

const bannerRoute=require('./route/banner.route');
const authRoute=require('./route/auth.router');
const AboutRoute=require('./route/about.router');
const RoomEnquiry=require('./route/RoomEnquiry.router');
const EventEnquiry=require('./route/EventEnquiry.router');
const RoomImages = require('./route/RoomImage.router');

const mongoose = require('mongoose');
const multer=require('multer');

const port = process.env.PORT || 5000;

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://adminroyalheritage.netlify.app",
        "https://royalheritagenew.netlify.app",
        "https://royalheritageayodhya.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(helmet({
    contentSecurityPolicy: false,
}));

app.disable('x-powered-by');

app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/auth',authRoute);
app.use('/api/banner',bannerRoute);
app.use('/api/about',AboutRoute);
app.use('/api/Room/Enquiry',RoomEnquiry);
app.use('/api/Event/Enquiry',EventEnquiry);
app.use('/api/Rooms/Image',RoomImages);

const swaggerDocs = require('./swagger');
swaggerDocs(app);

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) 
    {
        // Handle Multer errors
        if (err.code === 'LIMIT_FILE_SIZE') {
            return  res.status(413).json({
                status:0,
                data:"",
                statusCode : 413,
                message:`${err.message}, max limit is 5MB`,
              });
        }
    } 
    
    if (err.message === 'Invalid file type. Only JPEG, PNG, and GIF files are allowed') 
    {
            return  res.status(400).json({
                status:0,
                data:"",
                statusCode : 400,
                message: 'Invalid file type. Only JPEG, PNG, and GIF files are allowed.',
              });    
    }
    else
    {
        const status=err.status || 0;        
        const statusCode = err.statusCode || 500; 
        const data=err.data || "";
        const message = err.message || 'Internal Server Error';
        return res.status(statusCode).json({
          status,
          data,
          statusCode,
          message,
        });    
    }

});

app.get('/test/port',(req,res,next)=>{
       res.status(201).send(`Secure Connection with port ${port}`)
})

app.get('/test/database',(req,res)=>{
    const isConnected= mongoose.connection.readyState===1;
    if(isConnected){
        res.status(201).json({message :'Royal Heritage MongoDB connection is active'})
    }
    else{
        res.status(500).json({message :'MongoDB connection is not active'})
    }
})

app.get('/',(req,res)=>{
    res.send('hello')
})

app.listen(port,()=>{
    console.log(`Secure Connection with port ${port}`)
})
