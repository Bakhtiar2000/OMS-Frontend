import { FaCartPlus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import useSingleProduct from "../hook/useSingleProduct";
import PageLoader from "../utils/PageLoader";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import axiosSecure from "../hook/useAxios";
import { useState } from "react";
import useMyCart from "../hook/useMyCart";
import { Loader2 } from "lucide-react";
import type { TProduct } from "../types/product.type";

const SingleProductPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { myCartData, myCartLoading, myCartRefetch } = useMyCart();
  const [cartButtonLoading, setCartButtonLoading] = useState(false);
  const { singleProductData, singleProductLoading, singleProductRefetch } =
    useSingleProduct(id as string);
  if (singleProductLoading) return <PageLoader />;

  const handleAddToCart = async () => {
    if (!user) {
      toast.error(`Please login to add products to cart!`);
      navigate("/login");
      return;
    }
    if (user.role == "admin") {
      toast.error(`Admin cannot access cart!`);
      return;
    }
    try {
      setCartButtonLoading(true);
      const res = await axiosSecure.post(`carts/add-to-cart`, {
        productId: singleProductData._id,
      });
      if (res.status == 200) {
        toast.success(`Product added to cart`);
        singleProductRefetch();
        myCartRefetch();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error: any) {
      toast.error(error.response.data?.message || "Something went wrong!");
    } finally {
      setCartButtonLoading(false);
    }
  };
  let cart;
  if (!myCartLoading)
    cart =
      myCartData &&
      myCartData.cart.items.length > 0 &&
      myCartData.cart.items.find(
        (item: { productId: TProduct }) =>
          item.productId._id === singleProductData._id
      );
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
            Stock: {singleProductData.stock}
          </p>
        </div>
        <button
          disabled={(!!user && user.role === "admin") || !!cart}
          onClick={handleAddToCart}
          className="bg-yellow-300 hover:bg-yellow-500 rounded-xl text-xl flex items-center justify-center gap-2 p-2 font-semibold disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          {myCartLoading || cartButtonLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              Add to cart
              <FaCartPlus size={20} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SingleProductPage;
