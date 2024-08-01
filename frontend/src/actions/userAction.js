import axios from "axios";
import { USERS_URL } from "./constants";
import handleError from "./apiErrorHandler";

export const login = async (data) => {
  try {
    const response = await axios.post(`${USERS_URL}/auth`, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const register = async (data) => {
  try {
    const response = await axios.post(USERS_URL, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${USERS_URL}/logout`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const profile = async (data) => {
  try {
    const response = await axios.put(`${USERS_URL}/profile`, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(USERS_URL);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${USERS_URL}/${userId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getUserDetails = async (id) => {
  try {
    const response = await axios.get(`${USERS_URL}/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateUser = async (userId, data) => {
  try {
    const response = await axios.put(`${USERS_URL}/${userId}`, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
