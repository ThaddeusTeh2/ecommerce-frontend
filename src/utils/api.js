import axios from "axios";
import { toast } from "sonner";

//PRODUCTS

// static data
const API_URL = "http://localhost:5555";
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

// get 1 product
export const getProduct = async (_id) => {
  try {
    const response = await axios.get(API_URL + "/products/" + _id);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// add new product
export const addNewProduct = async (name, description, price, category) => {
  try {
    const response = await axios.post(API_URL + "/products", {
      name: name,
      description: description,
      price: price,
      category: category,
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// update product
export const editProduct = async (_id, name, description, price, category) => {
  try {
    const response = await axios.put(API_URL + "/products/" + _id, {
      name: name,
      description: description,
      price: price,
      category: category,
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// delete product
export const deleteProduct = async (_id) => {
  try {
    const response = await axios.delete(API_URL + `/products/${_id}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

//CATEGORY
export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL + "/categories"); // http://localhost:5555/categories
    return response.data;
  } catch (error) {
    console.log(error);
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

//create order
export const createOrder = async (
  customerName,
  customerEmail,
  products,
  totalPrice
) => {
  try {
    const response = await axios.post(API_URL + "/orders", {
      customerName,
      customerEmail,
      products,
      totalPrice,
    });
    return response.data;
  } catch (error) {
    toast.error(error.message);
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

// ORDERS
//get all orders
export const getAllOrders = async (_id) => {
  try {
    const response = await axios.get(API_URL + "/orders");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

//update
export const updateOrder = async (_id, status) => {
  try {
    const response = await axios.put(API_URL + `/orders/${_id}`, { status });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

//delete order
export const deleteOrder = async (_id) => {
  try {
    const response = await axios.delete(API_URL + `/orders/${_id}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
