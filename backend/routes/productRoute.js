const express = require('express');
const {getAllProducts,createProduct,updateProduct,deleteProduct,getProductDetails} = require('../controllers/productController');
const router = express.Router();
    
router.route("/products").get(getAllProducts);

router.route("/products/new").post(createProduct);

router.route("/products/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails);

//Both update and delete included in one 
// router.route("/products/:id").put(deleteProduct);

module.exports=router;