const backendDomain = process.env.REACT_APP_BACKEND_DOMAIN;
console.log(backendDomain);

const SummaryApi = {
  signUp: {
    url: `${backendDomain}/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomain}/signin`,
    method: "post",
  },
  logout_user: {
    url: `${backendDomain}/logout`,
  },
  current_user: {
    url: `${backendDomain}/user-details`,
    method: "get",
  },
  allProduct: {
    url: `${backendDomain}/get-products`,
    method: "get",
  },
  productDetails: {
    url: `${backendDomain}/product-details`,
    method: "get",
  },
  addToCartProduct: {
    url: `${backendDomain}/addtocart`,
    method: "post",
  },
  addToCartProductCount: {
    url: `${backendDomain}/countAddToCartProduct`,
    method: "get",
  },
  addToCartProductView: {
    url: `${backendDomain}/view-cart-products`,
    method: "get",
  },
  updateCartProduct: {
    url: `${backendDomain}/update-cart-product`,
    method: "post",
  },
  deleteCartProduct: {
    url: `${backendDomain}/delete-cart-product`,
    method: "post",
  },
  // admin
  allUser: {
    url: `${backendDomain}/all-user`,
    method: "get",
  },
  uploadProduct: {
    url: `${backendDomain}/upload-product`,
    method: "post",
  },
  updateProduct: {
    url: `${backendDomain}/update-product`,
    method: "post",
  },
  categoryProduct: {
    url: `${backendDomain}/get-categoryProduct`,
    method: "get",
  },
  categoryWiseProduct: {
    url: `${backendDomain}/category-product`,
    method: "post",
  },
  getOrder: {
    url: `${backendDomain}/order-list`,
    method: "get",
  },
  allOrder: {
    url: `${backendDomain}/all-order`,
    method: "get",
  },
  // save
  saveOrder: {
    url: `${backendDomain}/save-order`,
    method: "post",
  },
};

export default SummaryApi;
