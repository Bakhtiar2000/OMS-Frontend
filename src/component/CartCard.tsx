import { Trash } from "lucide-react";
import useSingleProduct from "../hook/useSingleProduct";
import Swal from "sweetalert2";
import axiosSecure from "../hook/useAxios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

type TCartCard = {
  item: {
    productId: {
      _id: string;
      price: number;
    };
    quantity: number;
    _id: string;
  };
  refetch: () => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const CartCard = ({ item, refetch, loading, setLoading }: TCartCard) => {
  const id = item.productId._id;
  const { singleProductData } = useSingleProduct(id);
  const [value, setValue] = useState<number>(item.quantity);

  // Debounce logic (2s)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (value !== item.quantity) handleUpdateQuantity();
    }, 2000);
    return () => clearTimeout(timer);
  }, [value]);

  // Delete item
  const handleCartItemDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/carts/item/${item.productId._id}`)
          .then((res) => {
            if (res.status === 200) {
              refetch();
              Swal.fire("Deleted!", "Product removed from cart.", "success");
            }
          })
          .catch((error) => {
            toast.error(
              error.response?.data?.message || "Something went wrong!"
            );
          });
      }
    });
  };

  // Update quantity
  const handleUpdateQuantity = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.patch(`carts/update-quantity`, {
        productId: item.productId._id,
        quantity: value,
      });
      if (res.status === 200) {
        // toast.success("Quantity updated!");
        refetch();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Control handlers
  const increase = () => setValue((prev) => prev + 1);
  const decrease = () => setValue((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="py-3 border-b border-gray-500 flex justify-between gap-5">
      <div className="flex gap-5">
        <img
          className="w-32 h-48 rounded object-cover"
          src={singleProductData.imageUrl}
          alt={singleProductData.name}
        />
        <div>
          <p className="font-semibold text-xl mb-5">{singleProductData.name}</p>
          <p>Price: ${singleProductData.price}</p>
          <p>Stock: {singleProductData.stock}</p>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between gap-5">
        {/* Quantity Counter */}
        <div className="flex items-center border border-dark rounded w-fit">
          <button
            onClick={decrease}
            className="px-3 py-1 text-lg disabled:bg-gray-100 disabled:opacity-40"
            disabled={loading || value <= 1}
          >
            -
          </button>
          <p className="px-4 py-1 min-w-[2.5rem] text-center">{value}</p>
          <button
            onClick={increase}
            className="px-3 py-1 text-lg disabled:bg-gray-100 disabled:opacity-40"
            disabled={loading}
          >
            +
          </button>
        </div>

        {/* Delete Icon */}
        <Trash
          onClick={handleCartItemDelete}
          className="text-red-500 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default CartCard;
