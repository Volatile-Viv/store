import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProducts } from "../actions/productAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const [data, setData] = useState({ products: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProducts({ keyword });
        setData(response);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [keyword]);

  return (
    <>
      {!keyword && <Header />}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data?.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="container mx-auto px-8 py-6 flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-4">Special Products</h1>
            <Link
              to="/shop"
              className="bg-pink-600 text-white font-bold rounded-full py-2 px-6 hover:bg-pink-700 transition duration-300"
            >
              Shop Now
            </Link>
          </div>

          <div className="container mx-auto px-8 py-6">
            <div className="flex justify-center flex-wrap">
              {data.products &&
                data.products.map((product) => (
                  <div key={product._id} className="m-4">
                    <Product product={product} />
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
