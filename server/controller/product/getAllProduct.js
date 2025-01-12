const productModel = require("../../models/productModel");

async function getAllProductController(req, res) {
  try {
    const allProduct = await productModel.find();
    res.json({
      message: "All products fetched successfully",
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

module.exports = getAllProductController;
