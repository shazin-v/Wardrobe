import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common/route";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [openModal, setOpenModal] = useState(null);
  const context = useContext(Context);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const responseData = await response.json();
      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData().finally(() => setLoading(false));
  }, []);

  const totalAmount = data.reduce(
    (total, item) => total + item.productId.sellingPrice * item.quantity,
    0
  );

  const totalItems = data.reduce((total, item) => total + item.quantity, 0);

  const increaseQty = async (id, qty) => {
    try {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id, quantity: qty + 1 }),
      });
      const responseData = await response.json();
      if (responseData.success) fetchData();
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  const decreaseQty = async (id, qty) => {
    if (qty > 1) {
      try {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
          method: SummaryApi.updateCartProduct.method,
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id: id, quantity: qty - 1 }),
        });
        const responseData = await response.json();
        if (responseData.success) fetchData();
      } catch (error) {
        console.error("Error decreasing quantity:", error);
      }
    }
  };

  const deleteCartProduct = async (id) => {
    try {
      const response = await fetch(SummaryApi.deleteCartProduct.url, {
        method: SummaryApi.deleteCartProduct.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id }),
      });
      const responseData = await response.json();
      if (responseData.success) {
        fetchData();
        context.fetchUserAddToCart();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  //
  const handleCheckout = async () => {
    try {
      const response = await fetch(SummaryApi.saveOrder.url, {
        method: SummaryApi.saveOrder.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems: data }),
      });
      const responseData = await response.json();

      if (responseData.success) {
        navigate("/success");
      } else {
        alert("Failed to save order: " + responseData.message);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
        Cart
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : data.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="-my-6 divide-y divide-gray-200">
            {data.map((item) => (
              <li key={item._id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item.productId.productImage[0]}
                    alt={item.productId.productName}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <a href={`product/${item.productId._id}`}>
                        {item.productId.productName}
                      </a>
                    </h3>
                    <p className="ml-4">{displayINRCurrency(item.productId.sellingPrice)}</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {item.productId.brandName}
                  </p>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="text-gray-500">
                      <button
                        onClick={() => decreaseQty(item._id, item.quantity)}
                        className="mr-2 p-1 rounded bg-gray-200"
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        onClick={() => increaseQty(item._id, item.quantity)}
                        className="ml-2 p-1 rounded bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => deleteCartProduct(item._id)}
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>{displayINRCurrency (totalAmount.toFixed(2))}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Total Items</p>
              <p>{totalItems}</p>
            </div>
            <button
              onClick={handleCheckout}
              className="mt-6 flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </button>
            <div className="mt-6 flex justify-center text-sm text-gray-500">
              <Link
                to="/"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continue Shopping &rarr;
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
