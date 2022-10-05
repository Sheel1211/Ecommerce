const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter your name"],
        maxLength:[30,"Name cannot exceed 30 characters"],
        minLength:[4,"Name should have more than 4 characters"],
    },
    email:{
        type:String,
        required:[true,"Please Enter your email address"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"],
    },
    password:{
        type:String,
        required:[true,"Please Enter your Password"],
        minLength:[8,"Password should be greater than or equal to 8 characters"],
        select:false,   //whenever documents.find() is fired than everything except password will be returned as result to the admin
    },
    avatar:
        //public id is the group of characters that we get after main url
        {
            public_id:{
                type: String,
                required:true
            },
            url:{
                type: String,
                required:true
            }
        },   
        role:{
            type:String,
            default:"user"
        },

        resetPasswordToken:String,
        resetPasswordExpire:Date,

})

userSchema.pre("save",async function(next){
    
    if(!this.isModified("password")){
        next(); 
    }
    this.password = await bcrypt.hash(this.password,10);
})

//JWT Token
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
};

module.exports = mongoose.model('User', userSchema);

//process.env.JWT_SECRET = if any user gets this secret key then he/she can login and generate any number of tokens.