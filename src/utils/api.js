import axios from "axios";
import { toast } from "sonner";

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

//category
export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL + "/categories"); // http://localhost:5555/categories
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
