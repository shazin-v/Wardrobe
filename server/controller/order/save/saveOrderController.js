const orderModel = require("../../../models/orderProductModel");
const addToCartModel = require("../../../models/cartProduct");

const saveOrderController = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const userId = req.userId;

    // Prepare order details
    const orderDetails = {
      userId,
      productDetails: cartItems.map((item) => ({
        productId: item.productId._id,
        name: item.productId.productName,
        price: item.productId.sellingPrice,
        quantity: item.quantity,
        image: item.productId.productImage,
      })),
      totalAmount: cartItems.reduce(
        (total, item) => total + item.productId.sellingPrice * item.quantity,
        0
      ),
    };

    // Save order
    const newOrder = new orderModel(orderDetails);
    const savedOrder = await newOrder.save();

    if (savedOrder?._id) {
      // Clear user's cart after saving the order
      await addToCartModel.deleteMany({ userId });
      res.status(201).json({
        success: true,
        message: "Order saved successfully.",
        order: savedOrder,
      });
    } else {
      throw new Error("Failed to save order.");
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Error saving order.",
    });
  }
};

module.exports = saveOrderController;
