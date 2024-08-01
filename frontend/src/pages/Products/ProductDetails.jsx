import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import { getProductDetails, createReview } from "../../actions/productAction";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setIsLoading(true);
        const fetchedProduct = await getProductDetails(productId);
        setProduct(fetchedProduct);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchProductDetails();
  }, [productId]);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ productId, rating, comment });
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error?.message);
    }
  };

  return (
    <>
      <Link to="/" className="text-white font-semibold hover:underline ml-4">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <div className="container mx-auto my-8 px-4 lg:px-0">
          <div className="flex flex-wrap items-start">
            <div className="w-full lg:w-1/2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full rounded-lg mb-4"
              />
              <HeartIcon product={product} />
            </div>

            <div className="w-full lg:w-1/2 lg:pl-8">
              <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
              <p className="text-gray-600 mb-6">{product.description}</p>

              <p className="text-4xl font-bold mb-6">₹ {product.price}</p>

              <div className="flex justify-between mb-6">
                <div>
                  <p className="text-gray-600 mb-2">Brand: {product.brand}</p>
                  <p className="text-gray-600 mb-2">
                    Added: {moment(product.createAt).fromNow()}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Reviews: {product.numReviews}
                  </p>
                </div>

                <div>
                  <p className="text-gray-600 mb-2">
                    Ratings: {product.rating}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Quantity: {product.quantity}
                  </p>
                  <p className="text-gray-600 mb-2">
                    In Stock: {product.countInStock}
                  </p>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
                {product.countInStock > 0 && (
                  <select
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    className="ml-4 py-1 px-2 bg-grey-300 rounded-lg text-black shadow-md"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <button
                onClick={addToCartHandler}
                disabled={product.countInStock === 0}
                className="bg-pink-600 text-white py-2 px-4 rounded-lg mr-4"
              >
                Add To Cart
              </button>
            </div>
          </div>
          <div className="mt-8">
            <ProductTabs
              userInfo={userInfo}
              submitHandler={submitHandler}
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              product={product}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
