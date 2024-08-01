import axios from "axios";
import { PRODUCT_URL, UPLOAD_URL } from "./constants";
import handleError from "./apiErrorHandler";

export const getProducts = async ({ keyword }) => {
  try {
    const response = await axios.get(PRODUCT_URL, { params: { keyword } });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${PRODUCT_URL}/${productId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const allProducts = async () => {
  try {
    const response = await axios.get(`${PRODUCT_URL}/allProducts`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getProductDetails = async (productId) => {
  try {
    const response = await axios.get(`${PRODUCT_URL}/${productId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(PRODUCT_URL, productData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateProduct = async (productId, formData) => {
  try {
    const response = await axios.put(`${PRODUCT_URL}/${productId}`, formData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const uploadProductImage = async (data) => {
  try {
    const response = await axios.post(UPLOAD_URL, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${PRODUCT_URL}/${productId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const createReview = async (data) => {
  try {
    const response = await axios.post(
      `${PRODUCT_URL}/${data.productId}/reviews`,
      data
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getTopProducts = async () => {
  try {
    const response = await axios.get(`${PRODUCT_URL}/top`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getNewProducts = async () => {
  try {
    const response = await axios.get(`${PRODUCT_URL}/new`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getFilteredProducts = async ({ checked, radio }) => {
  try {
    const response = await axios.post(`${PRODUCT_URL}/filtered-products`, {
      checked,
      radio,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
