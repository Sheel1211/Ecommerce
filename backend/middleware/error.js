const ErrorHandler = require('../utils/errorhandler');

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";


    //Wrong mongodb id given in url error(if wrong id is given in url)
    if(err.name==="CastError"){
        const message=`Resource not found. Invalid ${err.path}`;
        err = new ErrorHandler(message,400); 
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message
        // error:err.stack   to show exact location of error in file
    })
}