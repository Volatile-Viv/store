import React, { useState, useEffect } from "react";
import { getTopProducts } from "../actions/productAction";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topProducts = await getTopProducts();
        setProducts(topProducts);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-lg font-semibold mb-4">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id}>
            <SmallProduct product={product} />
          </div>
        ))}
      </div>
      <ProductCarousel />
    </div>
  );
};

export default Header;
