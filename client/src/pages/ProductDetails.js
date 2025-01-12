import React, { useContext, useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common/route";
import Context from "../context";
import addToCart from "../helpers/addToCart";
import displayINRCurrency from "../helpers/displayCurrency";

const ProductDetails = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const { fetchUserAddToCart } = useContext(Context);

  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
    colors: [],
    sizes: [],
  });

  const params = useParams();
  const productImageListLoading = new Array(4).fill(null);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(
        `${SummaryApi.productDetails.url}/${params.id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch product details");
      }

      const dataResponse = await response.json();
      setData(dataResponse?.data || {});
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const classNames = (...classes) => classes.filter(Boolean).join(" ");

  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li className="text-sm">
              <span
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {data?.category}
              </span>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          {data?.productImage.length > 0 ? (
            <>
              {data.productImage[0] && (
                <img
                  alt={`Image-1`}
                  src={data.productImage[0]}
                  className="hidden aspect-[3/4] size-full rounded-lg object-cover lg:block"
                />
              )}

              <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                {data?.productImage[1] && (
                  <img
                    alt={`Image-2`}
                    src={data.productImage[1]}
                    className="aspect-[3/2] size-full rounded-lg object-cover"
                  />
                )}
                {data?.productImage[2] && (
                  <img
                    alt={`Image-3`}
                    src={data.productImage[2]}
                    className="aspect-[3/2] size-full rounded-lg object-cover"
                  />
                )}
              </div>

              {data?.productImage[3] && (
                <img
                  alt={`Image-4`}
                  src={data.productImage[3]}
                  className="aspect-[4/5] size-full object-cover sm:rounded-lg lg:aspect-[3/4]"
                />
              )}
            </>
          ) : (
            <>
              <div className="flex justify-center items-center h-[calc(100vh-120px)]">
                <h1 className="text-2xl">Loading.....</h1>
              </div>
            </>
          )}
        </div>

        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {data?.productName}
            </h1>
          </div>

          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              {displayINRCurrency(data?.price)}
            </p>
            <p className="text-lg text-gray-500 line-through">
              {displayINRCurrency(data?.sellingPrice)}
            </p>

            {/* COLOR */}
            {/* <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Color</h3>
              <RadioGroup
                value={selectedColor}
                onChange={setSelectedColor}
                className="mt-4 flex items-center space-x-3"
              > */}
            {/* {data?.colors.map((color) => (
                  <RadioGroup.Option key={color} value={color}>
                    {({ active, checked }) => (
                      <span
                        className={classNames(
                          "block w-8 h-8 rounded-full border",
                          active || checked ? "ring ring-offset-1" : "",
                          "cursor-pointer"
                        )}
                        style={{ backgroundColor: color }}
                      />
                    )}
                  </RadioGroup.Option>
                ))}
              </RadioGroup>
            </div>

            {/* Sizes */}
            {/* <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <RadioGroup
                value={selectedSize}
                onChange={setSelectedSize}
                className="grid grid-cols-4 gap-4"
              >
                {data?.sizes.map((size) => (
                  <RadioGroup.Option key={size} value={size}>
                    {({ active, checked }) => (
                      <span
                        className={classNames(
                          "block py-2 px-4 rounded-md border text-center",
                          active || checked
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-100 text-gray-700",
                          "cursor-pointer"
                        )}
                      >
                        {size}
                      </span>
                    )}
                  </RadioGroup.Option>
                ))}
              </RadioGroup>
            </div> */}

            <button
              type="button"
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none"
              onClick={(e) => handleAddToCart(e, data?._id)}
            >
              Add to Cart
            </button>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            <h3 className="text-lg font-medium text-gray-900">Description</h3>
            <p className="mt-4 text-base text-gray-600">{data?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
