const express = require("express");
const userSignInControler = require("../controller/user/userSignIn");
const healthCheckController = require("../controller/health");
const userSignUpController = require("../controller/user/userSignUp");
const getAllProductController = require("../controller/product/getAllProduct");
const filterProductController = require("../controller/product/filterProduct");
const getProductDetailsController = require("../controller/product/getProductDetails");
const addToCartProductView = require("../controller/user/cart/addToCartProductView");
const authToken = require("../middleware/authToken");
const addToCartController = require("../controller/user/cart/addToCartController");
const userDetailsController = require("../controller/user/userDetails");
const countAddToCartProduct = require("../controller/user/cart/countAddToCartProduct");
const userLogout = require("../controller/user/userLogout");
const allUsers = require("../controller/user/admin/allUsers");
const updateProductController = require("../controller/product/updateProduct");
const getCategoryProduct = require("../controller/product/getCategoryProductOne");
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct");
const UploadProductController = require("../controller/product/uploadProduct");
const updateAddToCartProduct = require("../controller/user/cart/updateAddToCartProduct");
const deleteAddToCartProduct = require("../controller/user/cart/deleteAddToCartProduct");
const saveOrderController = require("../controller/order/save/saveOrderController");
const orderController = require("../controller/order/save/order.controller");
const allOrderController = require("../controller/order/save/allOrder.controller");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from Express");
});
router.get("/health", healthCheckController);

// auth
router.post("/signin", userSignInControler);
router.post("/signup", userSignUpController);
router.get("/logout", userLogout);

// user
router.get("/user-details", authToken, userDetailsController);

// product
router.get("/get-products", getAllProductController);
router.get("/product-details/:productId", getProductDetailsController);

router.get("/filer-product", filterProductController);

router.post("/upload-product", authToken, UploadProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-categoryProduct", getCategoryProduct);
router.post("/category-product", getCategoryWiseProduct);
// cart
router.post("/addtocart", authToken, addToCartController);
router.get("/view-cart-products", authToken, addToCartProductView);
router.get("/countAddToCartProduct", authToken, countAddToCartProduct);
router.post("/update-cart-product", authToken, updateAddToCartProduct);
router.post("/delete-cart-product", authToken, deleteAddToCartProduct);

// order
// save
router.post("/save-order", authToken, saveOrderController);

router.get("/order-list", authToken, orderController);
router.get("/all-order", authToken, allOrderController);

// admin
router.get("/all-user", authToken, allUsers);

module.exports = router;
