import { FaCartPlus } from "react-icons/fa";
import type { TProduct } from "../types/product.type";
import { Link, useNavigate } from "react-router-dom";
import axiosSecure from "../hook/useAxios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import useMyCart from "../hook/useMyCart";
import { Loader2 } from "lucide-react";
import { useState } from "react";

type TProductCard = {
  product: TProduct;
  refetch: () => void;
};

const ProductCard = ({ product, refetch }: TProductCard) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { myCartData, myCartLoading, myCartRefetch } = useMyCart();
  const [cartButtonLoading, setCartButtonLoading] = useState(false);
  const { imageUrl, name, price, _id, stock } = product;

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
        productId: _id,
      });
      if (res.status == 200) {
        toast.success(`Product added to cart`);
        refetch();
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
  if (user && !myCartLoading)
    cart =
      myCartData &&
      myCartData.cart.items.length > 0 &&
      myCartData.cart.items.find(
        (item: { productId: TProduct }) => item.productId._id === _id
      );
  console.log(!!cart);

  return (
    <div className="w-[260px] border p-3 rounded-xl">
      <div className="flex flex-col gap-2 hover:scale-95 transition-all">
        <Link to={`/products/${_id}`}>
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-[200px] rounded-xl"
          />
        </Link>
        <h1 className="text-xl">{name}</h1>
        <p>${price}</p>
        <p>Stock: {stock}</p>
        <button
          disabled={(!!user && user.role === "admin") || !!cart}
          onClick={handleAddToCart}
          className="bg-zinc-800 text-white rounded-xl p-2 cursor-pointer flex gap-2 items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {cartButtonLoading || myCartLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <FaCartPlus />
              Add to cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
