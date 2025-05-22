import { useForm } from "react-hook-form";
import useMyCart from "../hook/useMyCart";
import useSingleProduct from "../hook/useSingleProduct";
import { Loader2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import axiosSecure from "../hook/useAxios";
import { useNavigate } from "react-router-dom";

type TOrderForm = {
  number: string;
  note?: string;
  paymentStatus: "cod" | "paid";
  street: string;
  city: string;
  postalCode: number;
};

const OrderPage = () => {
  const [loading, setLoading] = useState(false);
  const { myCartData, myCartLoading } = useMyCart();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TOrderForm>();

  const handleOrderSubmit = async (data: TOrderForm) => {
    const orderInfo = {
      number: data.number,
      totalAmount: parseInt(myCartData.totalAmount),
      paymentStatus: data.paymentStatus,
      note: data.note || "",
      shippingAddress: {
        street: data.street,
        city: data.city,
        postalCode: parseInt(data.postalCode.toString()),
      },
    };
    try {
      setLoading(true);
      await axiosSecure.post(`/orders/create-order`, orderInfo);
      toast.success("Order placed successfully!");
      navigate("/track-order");
      reset();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to make order!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-5xl mx-8 lg:mx-auto py-10 lg:px-4">
      <h2 className="text-2xl font-semibold text-center mb-4">My Order</h2>
      {myCartLoading ? (
        <div className="flex justify-center items-center py-20 text-4xl">
          <Loader2 className="w-16 h-16 animate-spin" />
        </div>
      ) : (
        <div>
          {myCartData.cart && myCartData.cart.items.length > 0 ? (
            <div className="flex flex-col md:flex-row justify-between gap-10">
              <form
                onSubmit={handleSubmit(handleOrderSubmit)}
                className="w-full grid grid-cols-2 gap-5"
              >
                {/* Number */}
                <div>
                  <label className="block text-left text-sm font-medium text-gray-700">
                    Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("number", {
                      required: "Number is required",
                    })}
                    className="w-full mt-1 p-2 border rounded outline-none border-dark/50 focus:border-dark bg-white"
                  />
                  {errors.number && (
                    <p className="text-red-500 text-sm">
                      {errors.number.message}
                    </p>
                  )}
                </div>
                {/* Street */}
                <div>
                  <label className="block text-left text-sm font-medium text-gray-700">
                    Street <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("street", {
                      required: "Street is required",
                    })}
                    className="w-full mt-1 p-2 border rounded outline-none border-dark/50 focus:border-dark bg-white"
                  />
                  {errors.street && (
                    <p className="text-red-500 text-sm">
                      {errors.street.message}
                    </p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="block text-left text-sm font-medium text-gray-700">
                    City <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("city", {
                      required: "City is required",
                    })}
                    className="w-full mt-1 p-2 border rounded outline-none border-dark/50 focus:border-dark bg-white"
                  >
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chittagong">Chittagong</option>
                  </select>
                  {errors.city && (
                    <p className="text-red-500 text-sm">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                {/* Postal Code */}
                <div>
                  <label className="block text-left text-sm font-medium text-gray-700">
                    Postal Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    {...register("postalCode", {
                      required: "Postal Code is required",
                    })}
                    className="w-full mt-1 p-2 border rounded outline-none border-dark/50 focus:border-dark bg-white"
                  />
                  {errors.postalCode && (
                    <p className="text-red-500 text-sm">
                      {errors.postalCode.message}
                    </p>
                  )}
                </div>

                {/* Note */}
                <div>
                  <label className="block text-left text-sm font-medium text-gray-700">
                    Note <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register("note")}
                    className="w-full mt-1 p-2 border rounded outline-none border-dark/50 focus:border-dark bg-white"
                  />
                </div>

                {/* Payment Status */}
                <div>
                  <label className="block text-left text-sm font-medium text-gray-700">
                    Payment Status <span className="text-red-500">*</span>
                  </label>

                  <div className="mt-2 ">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="paid"
                        {...register("paymentStatus", {
                          required: "Payment Status is required",
                        })}
                        className="text-dark focus:ring-dark"
                      />
                      <span>Manual Payment</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="cod"
                        {...register("paymentStatus", {
                          required: "Payment Status is required",
                        })}
                        className="text-dark focus:ring-dark"
                      />
                      <span>Cash on Delivery</span>
                    </label>
                  </div>

                  {errors.paymentStatus && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.paymentStatus.message}
                    </p>
                  )}
                </div>
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="col-span-2 w-full bg-dark text-white rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition mt-3 mb-2"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                  ) : (
                    "Complete Order"
                  )}
                </button>
              </form>

              <div className="w-1/2">
                {myCartData.cart &&
                  myCartData.cart.items.map((item: any) => {
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
                          <p className="font-semibold">
                            {singleProductData.name}
                          </p>
                          <p className="flex items-center mb-2">
                            <X size={12} />
                            {item.quantity}
                          </p>
                          <p className="text-sm">
                            Price: ${singleProductData.price}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                <div
                  className={`border border-dark p-5 rounded-xl h-fit transition-all mt-5`}
                >
                  <h2 className="font-semibold text-xl mb-5 text-center">
                    Order Summary
                  </h2>
                  <p className="flex justify-between gap-3">
                    <span>Price:</span> {myCartData.totalAmount}
                  </p>
                  <p className="flex justify-between gap-3">
                    <span>Discount:</span> 0
                  </p>
                  <p className="border-b border-dark my-2"></p>
                  <p className="flex justify-between gap-3">
                    <span>Initial Cost:</span> {myCartData.totalAmount}
                  </p>

                  <p className="mt-5 flex justify-between gap-3">
                    <span>Delivery Cost:</span> 70
                  </p>
                  <p className="border-b border-dark my-2"></p>
                  <p className="flex justify-between gap-3">
                    <span>Total Cost:</span>{" "}
                    <span className="font-bold text-lg">
                      {parseFloat(myCartData.totalAmount) + 70}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-center">No Items Found</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default OrderPage;
