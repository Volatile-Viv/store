import axios from "axios";
import { ORDERS_URL, PAYPAL_URL } from "./constants";
import handleError from "./apiErrorHandler";

export const createOrder = async (order) => {
  try {
    const response = await axios.post(ORDERS_URL, order);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getOrderDetails = async (id) => {
  try {
    const response = await axios.get(`${ORDERS_URL}/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const payOrder = async ({ orderId, details }) => {
  try {
    const response = await axios.put(`${ORDERS_URL}/${orderId}/pay`, details);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getPaypalClientId = async () => {
  try {
    const response = await axios.get(PAYPAL_URL);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getMyOrders = async () => {
  try {
    const response = await axios.get(`${ORDERS_URL}/mine`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getOrders = async () => {
  try {
    const response = await axios.get(ORDERS_URL);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deliverOrder = async (orderId) => {
  try {
    const response = await axios.put(`${ORDERS_URL}/${orderId}/deliver`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getTotalOrders = async () => {
  try {
    const response = await axios.get(`${ORDERS_URL}/total-orders`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getTotalSales = async () => {
  try {
    const response = await axios.get(`${ORDERS_URL}/total-sales`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getTotalSalesByDate = async () => {
  try {
    const response = await axios.get(`${ORDERS_URL}/total-sales-by-date`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
