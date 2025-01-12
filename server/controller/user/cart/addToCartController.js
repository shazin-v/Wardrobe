const addToCartModel = require("../../../models/cartProduct");

async function addToCartController(req, res) {
  try {
    const { productId } = req?.body;
    const currentUser = req.userId;

    const isProductAvailable = await addToCartModel.findOne({
      productId,
      userId: currentUser,
    });

    if (isProductAvailable) {
      return res.json({
        message: "Already exits in Add to cart",
        success: false,
        error: true,
      });
    }

    const payload = {
      userId: currentUser,
      productId: productId,
      quantity: 1,
    };
    const newAddTocart = new addToCartModel(payload);
    const saveProduct = await newAddTocart.save();
    console.log("saveProduct   ", saveProduct);
    res.json({
      message: "Product added to cart successfully",
      success: true,
      error: false,
      data: saveProduct,
    });
  } catch (error) {
    res.json({
      message: "addtocart error catch" || error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = addToCartController;
