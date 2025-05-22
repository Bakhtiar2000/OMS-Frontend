import { Loader2 } from "lucide-react";
import useMyCart from "../hook/useMyCart";
import CartCard from "../component/CartCard";
import { useState } from "react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { myCartData, myCartLoading, myCartRefetch } = useMyCart();
  const [loading, setLoading] = useState(false);
  return (
    <div className="max-w-5xl mx-8 lg:mx-auto py-10 lg:px-4">
      <h2 className="text-2xl font-semibold text-center mb-4">My Cart</h2>

      {myCartLoading ? (
        <div className="flex justify-center items-center py-20 text-4xl">
          <Loader2 className="w-16 h-16 animate-spin" />
        </div>
      ) : (
        <div className="overflow-x6-auto">
          {myCartData.cart && myCartData.cart.items.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-10">
              {/* Cart Cards */}
              <div className="col-span-2">
                {myCartData.cart.items.map((item: any) => (
                  <CartCard
                    item={item}
                    refetch={myCartRefetch}
                    loading={loading}
                    setLoading={setLoading}
                  />
                ))}
              </div>

              {/* Order summary */}
              <div
                className={`border border-dark p-5 rounded-xl h-fit transition-all ${
                  loading
                    ? "blur-sm  pointer-events-none cursor-not-allowed"
                    : ""
                }`}
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
                  {parseFloat(myCartData.totalAmount) + 70}
                </p>

                <Link
                  to="/order"
                  className="w-full mt-5 bg-zinc-800 text-white rounded-xl p-2 cursor-pointer flex gap-2 items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Proceed to payment
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-center">No Items Found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage;
