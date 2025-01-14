import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "../constants";

//PRODUCTS

// get all products (public)
export const getProducts = async (category = "", page = 1) => {
  try {
    const response = await axios.get(
      API_URL + "/products?page=" + page + "&category=" + category
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// get 1 product (public)
export const getProduct = async (_id) => {
  try {
    const response = await axios.get(API_URL + "/products/" + _id);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// add new product (admin)
export const addNewProduct = async (
  name,
  description,
  price,
  category,
  image,
  token
) => {
  try {
    const response = await axios.post(
      API_URL + "/products",
      {
        name: name,
        description: description,
        price: price,
        category: category,
        image: image,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// update product (admin)
export const editProduct = async (
  _id,
  name,
  description,
  price,
  category,
  token
) => {
  try {
    const response = await axios.put(
      API_URL + "/products/" + _id,
      {
        name: name,
        description: description,
        price: price,
        category: category,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// delete product (admin)
export const deleteProduct = async (_id, token) => {
  try {
    const response = await axios.delete(API_URL + `/products/${_id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

//CATEGORY

//get all categories
export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL + "/categories"); // http://localhost:5555/categories
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//get 1 category
export const getCategory = async (_id) => {
  try {
    const response = await axios.get(API_URL + "/categories/" + _id);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

//add category
export const addNewCategory = async (name, token) => {
  try {
    const response = await axios.post(
      API_URL + "/categories",
      {
        name: name,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

//update category
export const updateCategory = async (_id, name, token) => {
  try {
    const response = await axios.put(
      API_URL + "/categories/" + _id,
      {
        _id,
        name,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

//delete category
export const deleteCategory = async (_id, token) => {
  try {
    const response = await axios.delete(API_URL + `/categories/${_id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

//CART
// add product to cart
export function AddToCart(product) {
  // get the current items in the cart
  const cart = getCart();
  // find if the product already exist in the cart or not
  const selectedProduct = cart.find((p) => p._id === product._id);
  if (selectedProduct) {
    // if product already exists, just increase the quantity
    selectedProduct.quantity++;
  } else {
    // if not exist, add it into the cart
    // long method
    // const newProduct = { ...product };
    // newProduct.quantity = 1;
    // cart.push(newProduct);
    // short method
    cart.push({
      ...product,
      quantity: 1,
    });
  }
  // update the cart with the latest data
  updateCart(cart);
}

// get items in the cart
export function getCart() {
  // first iteration
  // get cart items from local storage
  const cart = JSON.parse(localStorage.getItem("cart"));
  //   if (cart) {
  //     return cart;
  //   } else {
  //     return [];
  //   }
  // second iteration
  //   return cart ? cart : [];
  // third iteration
  return cart || [];
}

// update the cart in the local storage
export function updateCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// delete item from the cart
export function deleteItemFromCart(_id) {
  // get the current cart
  // long method
  //   const cart = getCart();
  //   const updatedCart = cart.filter((p) => p._id !== _id);
  //   updateCart(updatedCart);
  // short method
  updateCart(getCart().filter((p) => p._id !== _id));
}

// get total price in cart
export function getTotalCartPrice() {
  const cart = getCart();
  let total = 0;
  cart.forEach((item) => {
    total = total + item.price * item.quantity;
  });
  return total.toFixed(2);
}

//ORDERS

// ORDERS tokened
//get all orders
export const getAllOrders = async (token) => {
  try {
    const response = await axios.get(API_URL + "/orders", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

//create order
export const createOrder = async (
  customerName,
  customerEmail,
  products,
  totalPrice,
  token
) => {
  try {
    const response = await axios.post(
      API_URL + "/orders",
      {
        customerName,
        customerEmail,
        products,
        totalPrice,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};
//update
export const updateOrder = async (_id, status, token) => {
  try {
    const response = await axios.put(
      API_URL + `/orders/${_id}`,
      { status },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

//delete order
export const deleteOrder = async (_id, token) => {
  try {
    const response = await axios.delete(API_URL + `/orders/${_id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

//PAYMENT

export const verifyPayment = async (
  billplz_id,
  billplz_paid,
  billplz_paid_at,
  billplz_x_signature
) => {
  try {
    const response = await axios.post(API_URL + "/payment", {
      billplz_id,
      billplz_paid,
      billplz_paid_at,
      billplz_x_signature,
    });
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

//CLEAR CART AFTER PAYMENT
export function clearCart() {
  localStorage.removeItem("cart");
}
