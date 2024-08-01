import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";
import AdminMenu from "./AdminMenu";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  fetchCategories,
} from "../../actions/categoryAction";

const CategoryList = () => {
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [categories, setCategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchAndSetCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to fetch categories.");
      }
    };

    fetchAndSetCategories();
  }, []);

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await createCategory({ name });
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
        setCategories([...categories, result]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating category failed, try again.");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updatingName) {
      toast.error("Category name is required");
      return;
    }

    try {
      if (!selectedCategory || !selectedCategory._id) {
        toast.error("No category selected for update");
        return;
      }

      const categoryId = selectedCategory._id;
      const updatedCategory = { name: updatingName };

      const result = await updateCategory(categoryId, updatedCategory);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        setSelectedCategory(null);
        setUpdatingName("");
        setModalVisible(false);
        setCategories(
          categories.map((cat) => (cat._id === result._id ? result : cat))
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update category. Please try again.");
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        setSelectedCategory(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Category delection failed. Try again.");
    }
  };

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <AdminMenu />
      <div className="md:w-3/4 p-3">
        <div className="h-12">Manage Categories</div>

        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        />
        <br />
        <hr />

        <div className="flex flex-wrap">
          {categories.map((category) => (
            <div key={category._id}>
              <button
                className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none foucs:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                onClick={() => {
                  setModalVisible(true);
                  setSelectedCategory(category);
                  setUpdatingName(category.name);
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>

        {modalVisible && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

              <div className="modal-container bg-white w-1/3 rounded-lg shadow-lg z-50 overflow-y-auto">
                <div className="p-3">
                  <form className="space-y-3">
                    <input
                      type="text"
                      className="py-3 px-4 border rounded-lg w-full"
                      placeholder="Write category name"
                      value={updatingName}
                      onChange={(e) => setUpdatingName(e.target.value)}
                    />

                    <div className="flex justify-between">
                      <button
                        onClick={handleUpdateCategory}
                        className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 foucs:ring-pink-500 focus:ring-opacity-50"
                      >
                        Update
                      </button>

                      <button
                        onClick={handleDeleteCategory}
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 foucs:ring-red-500 focus:ring-opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
