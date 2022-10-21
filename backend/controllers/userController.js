const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors=require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const sendToken = require("../utils/jwtToken");

//Register a User
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    
    const {name,email,password}=req.body;
    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"this is a sample id",
            url:"profilepicUrl",
        }
    });

    // const token = user.getJWTToken();

    // res.status(201).json({
    //     success:true,
    //     token,
    // });

    sendToken(user,201,res);
});

//Login User
exports.loginUser = catchAsyncErrors(async(req,res,next)=>{

    const {email,password} = req.body;

    //checking if user has given password and email both

    if(!email || !password){
        return next(new ErrorHandler("Please enter your email and password",400));
    }

    const user = await User.findOne({email: email}).select("+password");  //we have made password false in model that'swhy we did this

    if(!user){
        return next(new ErrorHandler("Invalid email and password",401));
    }
    
    const isPasswordMatched = await user.comparePassword(password);
    
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email and password",401));
    }

    sendToken(user,200,res);
})

//Logout user

exports.logout = catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });

    res.status(200).json({
        success:true,
        message:"Logged out",
    });
});