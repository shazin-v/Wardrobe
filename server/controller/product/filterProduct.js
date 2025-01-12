const productModel = require("../../models/productModel");

const filterProductController = async (req, res) => {
  try {
    const categoryList = req?.body?.category || []; // Categories from the request body

    // Query logic
    const query = categoryList.length
      ? { category: { $in: categoryList } } // Filter by categories if provided
      : {}; // Default case: fetch all products

    const products = await productModel.find(query);

    // Alternative youtube query logic
    // const product = await productModel.find({
    //     category: {
    //       $in: categoryList,
    //     },
    //   });

    res.json({
      data: products,
      message: "Products fetched successfully",
      error: false,
      success: true,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = filterProductController;
