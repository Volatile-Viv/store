import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-full md:w-[30rem] mx-auto md:mx-[2rem] my-4 md:my-0 p-3 relative shadow-lg rounded-md bg-white">
      <Link
        to={`/product/${product._id}`}
        className="text-black hover:text-gray-800"
      >
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-md"
          />
          <HeartIcon
            product={product}
            className="absolute bg-black top-0 right-0 m-3"
          />
        </div>

        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">{product.name}</h2>

          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-medium">₹ {product.price}</span>
            <span className="bg-pink-100 text-pink-800 text-sm font-medium px-3 py-1 rounded-full">
              View Details
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;
