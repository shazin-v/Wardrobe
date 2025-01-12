import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SummaryApi from "../../common/route";
import UploadProduct from "../../components/UploadProduct";
import AdminProductCard from "../../components/AdminProductCard";

const AllProduct = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [openUploadProduct, setOpenUploadProduct] = useState(false);

  const fetchAllProduct = async () => {
    const fetchData = await fetch(SummaryApi.allProduct.url, {
      method: SummaryApi.allProduct.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();
    if (dataResponse.success) {
      setAllProduct(dataResponse.data);
    }
    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);
  return (
    <>
      <div>
        <div className="bg-white py-2 px-4 flex justify-between items-center">
          <h2 className="font-bold text-lg">All Product</h2>
          <button
            className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full "
            onClick={() => setOpenUploadProduct(true)}
          >
            Upload Product
          </button>
        </div>
        <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
          {allProduct.map((product, index) => {
            return (
              <AdminProductCard
                data={product}
                key={index + "allProduct"}
                fetchdata={fetchAllProduct}
              />
            );
          })}
        </div>
        {openUploadProduct && (
          <UploadProduct
            onClose={() => setOpenUploadProduct(false)}
            fetchData={fetchAllProduct}
          />
        )}
      </div>
    </>
  );
};

export default AllProduct;
