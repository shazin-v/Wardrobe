const productModel = require("../../models/productModel");

async function getProductDetailsController(req, res) {
  try {
    const { productId } = req.params;
    const product = await productModel.findById(productId);
    console.log("product", product);
    console.log("productId", productId);
    if (!product) {
      return res.json({
        message: "Product not found",
        success: false,
        error: true,
      });
    }
    res.json({
      message: "Product fetched successfully",
      success: true,
      error: false,
      data: product,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = getProductDetailsController;
