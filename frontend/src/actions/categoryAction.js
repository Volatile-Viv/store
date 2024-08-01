import axios from "axios";
import { CATEGORY_URL } from "./constants";
import handleError from "./apiErrorHandler";

export const createCategory = async (newCategory) => {
  try {
    const response = await axios.post(CATEGORY_URL, newCategory);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateCategory = async (categoryId, updatedCategory) => {
  try {
    const response = await axios.put(
      `${CATEGORY_URL}/${categoryId}`,
      updatedCategory
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(`${CATEGORY_URL}/${categoryId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${CATEGORY_URL}/categories`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
