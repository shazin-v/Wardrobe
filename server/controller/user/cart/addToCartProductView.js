const addToCartModel = require("../../../models/cartProduct");

async function addToCartProductView(req, res) {
  try {
    const currentUser = req.userId;

    const allProduct = await addToCartModel
      .find({ userId: currentUser })
      .populate("productId");
    res.json({
      message: "Product fetched successfully",
      success: true,
      error: false,
      data: allProduct,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = addToCartProductView;
