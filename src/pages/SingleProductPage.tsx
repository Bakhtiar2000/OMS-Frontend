import { FaCartPlus } from "react-icons/fa";
import { RiStockLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import useSingleProduct from "../hook/useSingleProduct";
import PageLoader from "../utils/PageLoader";

const SingleProductPage = () => {
  const { id } = useParams();
  const { singleProductData, singleProductLoading } = useSingleProduct(
    id as string
  );
  if (singleProductLoading) return <PageLoader />;

  const handleAddToCart = () => {};
  return (
    <div className="flex flex-col md:flex-row justify-evenly items-center w-full h-[80vh]">
      <div className="flex flex-col gap-4 md:flex-row md:gap-0">
        <img
          src={singleProductData.imageUrl}
          alt={singleProductData.name}
          className="h-72 w-72 md:h-96 md:w-96 object-cover rounded-xl"
        />
      </div>
      <div className="flex flex-col gap-2 md:gap-8 px-3">
        <h1 className="text-xl md:text-4xl font-bold">
          {singleProductData.name}
        </h1>
        <p className="text-lg md:text-xl font-semibold">
          $ {singleProductData.price}
        </p>
        <p className="text-lg md:text-xl font-semibold">
          {singleProductData.description}
        </p>
        <div className="flex gap-2 items-center">
          <p className="text-lg md:text-xl font-semibold">
            {singleProductData.stock}
          </p>
          <RiStockLine size={25} />
        </div>
        <button
          onClick={handleAddToCart}
          className="bg-yellow-300 hover:bg-yellow-500 rounded-xl text-xl flex items-center justify-center gap-2 p-2 font-semibold cursor-pointer"
        >
          Add to cart
          <FaCartPlus size={20} />
        </button>
      </div>
    </div>
  );
};

export default SingleProductPage;
