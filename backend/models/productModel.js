const mongoose = require('mongoose');

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter product name"],
        trim:true,
    },
    description:{
        type:String,
        required:[true,"Please enter product description"]

    },
    price:{
        type:Number,
        required:[true,"Please enter product price"],
        maxLength:[8,"Price cannot exceed 8 characters"]
    },
    ratings:{
        type:Number,
        default:0,
    },
    images:[
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
        }
    ],    
    category:{
        type: String,
        required:[true,"Please select a category"],
    },
    Stock:{
        type:Number,
        required:[true,"Please Enter Product Stock"],
        maxLength:[4,"Stock cannot exceed 4 characters"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{   //To check which admin with which userId created this product
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true,
            },
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],

    user:{   //To check which admin with which userId created this product
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },

    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Product",productSchema);