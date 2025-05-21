import { FaCartPlus } from "react-icons/fa";
import type { TProduct } from "../types/product.type";
import { Link, useNavigate } from "react-router-dom";
import axiosSecure from "../hook/useAxios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

type TProductCard = {
  product: TProduct;
  refetch: () => void;
};

const ProductCard = ({ product, refetch }: TProductCard) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { imageUrl, name, price, _id, stock } = product;

  const handleAddToCart = async () => {
    if (!user) {
      toast.error(`Please login to add products to cart!`);
      navigate("/login");
      return;
    }
    try {
      const res = await axiosSecure.post(`carts/add-to-cart`, {
        productId: _id,
      });
      if (res.status == 200) {
        toast.success(`Product added to cart`);
        refetch();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error: any) {
      toast.error(error.response.data?.message || "Something went wrong!");
    }
  };

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
          onClick={handleAddToCart}
          className="bg-zinc-800 text-white rounded-xl p-2 cursor-pointer flex gap-2 items-center justify-center"
        >
          <FaCartPlus />
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
