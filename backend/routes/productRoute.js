const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/productController");
const { isAuthenticatedUser ,authorizedRoles} = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);

router.route("/products/new").post(isAuthenticatedUser,authorizedRoles("admin"),createProduct);

router
  .route("/products/:id")
  .put(isAuthenticatedUser,authorizedRoles("admin"),updateProduct)
  .delete(isAuthenticatedUser,authorizedRoles("admin"),deleteProduct)
  .get(getProductDetails);

//Both update and delete included in one
// router.route("/products/:id").put(deleteProduct);

module.exports = router;
