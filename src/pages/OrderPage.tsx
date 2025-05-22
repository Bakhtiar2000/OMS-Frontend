import { useForm } from "react-hook-form";
import useMyCart from "../hook/useMyCart";
import useSingleProduct from "../hook/useSingleProduct";

type TOrderForm = {
  number: string;
  note: string;
  paymentStatus: "cod" | "paid";
  shippingAddress: {
    street: string;
    city: string;
    postalCode: number;
  };
};

const OrderPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TOrderForm>();
  const { myCartData, myCartLoading, myCartRefetch } = useMyCart();
  return (
    <section className="max-w-5xl mx-8 lg:mx-auto py-20 md:pt-24 lg:px-4">
      <h2 className="text-2xl font-semibold text-center mb-4">My Order</h2>
      <form className="flex flex-col md:flex-row justify-between gap-10">
        <div>
          {/* Number */}
          <div>
            <label className="block text-left text-sm font-medium text-gray-700">
              Number <span className="text-red-500">*</span>
            </label>
            <input
              {...register("number", {
                required: "Number is required",
              })}
              className="w-full mt-1 p-2 border rounded outline-none focus:border-black bg-white"
            />
            {errors.number && (
              <p className="text-red-500 text-sm">{errors.number.message}</p>
            )}
          </div>

          {/* Note */}
          <div>
            <label className="block text-left text-sm font-medium text-gray-700">
              Note <span className="text-red-500">*</span>
            </label>
            <input
              {...register("note", {
                required: "Note is required",
              })}
              className="w-full mt-1 p-2 border rounded outline-none focus:border-black bg-white"
            />
            {errors.note && (
              <p className="text-red-500 text-sm">{errors.note.message}</p>
            )}
          </div>

          {/* Street */}
          <div>
            <label className="block text-left text-sm font-medium text-gray-700">
              Street <span className="text-red-500">*</span>
            </label>
            <input
              {...register("shippingAddress.street", {
                required: "Street is required",
              })}
              className="w-full mt-1 p-2 border rounded outline-none focus:border-black bg-white"
            />
            {errors.shippingAddress && (
              <p className="text-red-500 text-sm">
                {errors.shippingAddress.message}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-left text-sm font-medium text-gray-700">
              City <span className="text-red-500">*</span>
            </label>
            <select
              {...register("shippingAddress.city", {
                required: "City is required",
              })}
              className="w-full mt-1 p-2 border rounded outline-none focus:border-black bg-white"
            >
              <option value="Dhaka">Dhaka</option>
              <option value="Chittagong">Chittagong</option>
            </select>
            {errors.shippingAddress && (
              <p className="text-red-500 text-sm">
                {errors.shippingAddress.message}
              </p>
            )}
          </div>

          {/* Postal Code */}
          <div>
            <label className="block text-left text-sm font-medium text-gray-700">
              Postal Code <span className="text-red-500">*</span>
            </label>
            <input
              {...register("shippingAddress.postalCode", {
                required: "Postal Code is required",
              })}
              className="w-full mt-1 p-2 border rounded outline-none focus:border-black bg-white"
            />
            {errors.shippingAddress && (
              <p className="text-red-500 text-sm">
                {errors.shippingAddress.message}
              </p>
            )}
          </div>
        </div>

        <div>
          {myCartData.cart.items.map((item: any) => {
            const id = item.productId._id;
            const { singleProductData } = useSingleProduct(id);
            return (
              <div className="flex gap-5">
                <img
                  className="w-20 h-28 rounded object-cover"
                  src={singleProductData.imageUrl}
                  alt={singleProductData.name}
                />
                <div>
                  <p className="font-semibold mb-5">{singleProductData.name}</p>
                  <p className="text-sm">Price: ${singleProductData.price}</p>
                  <p className="text-sm">Stock: {singleProductData.stock}</p>
                </div>
              </div>
            );
          })}
        </div>
      </form>
    </section>
  );
};

export default OrderPage;
