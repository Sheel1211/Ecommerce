const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors=require('../middleware/catchAsyncErrors');
const ApiFeatures = require("../utils/apiFeatures");


//Create Product-->Admin    
exports.createProduct = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product // to print all details about product
    })
});


//Get All Product
exports.getAllProducts = catchAsyncErrors(async(req,res)=>{
    const pagePerPage=5;
    const  productCount  = await Product.countDocuments();
    const apiFeature=new ApiFeatures(Product.find(),req.query).search().filter().pagination(pagePerPage);

    const products = await apiFeature.query;
    res.status(200).json({
        success: true,
        products 
    }); 
});

//Update Product -->Admin

exports.updateProduct=catchAsyncErrors(async(req,res,next)=>{
    let product = await Product.findById(req.params.id);

    // if(!product){
    //     return res.status(500).json({
    //         success: false,
    //         message:"Product not found"
    //     })
    // }

    //Using error.js
    if(!product){
        //next is a callback function...
        return next(new ErrorHandler("Product Not Found",404));
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,useFindAndModify:false});

    res.status(200).json({
        success:true,
        product
    })
});


//Delete Product

exports.deleteProduct=catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    // if(!product){
    //     return res.status(500).json({
    //         success: false,
    //         message:"Product not found"
    //     })
    // }

    //Using error.js
    if(!product){
        //next is a callback function...
        return next(new ErrorHandler("Product Not Found",404));
    }

    await product.remove();

    res.status(200).json({
        success:false,
        message:"Product deleted successfully"
    })
});


//Get Single Product Details
exports.getProductDetails=catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    // if(!product){
    //     return res.status(500).json({
    //         success: false,
    //         message:"Product not found"
    //     })
    // }


    //Using error.js
    if(!product){
        //next is a callback function...
        return next(new ErrorHandler("Product Not Found",404));
    }

    

    res.status(200).json({
        success:false,
        product
    })
});
