import { useEffect, useState } from "react";

import { format } from "date-fns";

import toast from "react-hot-toast";
import type { TOrder } from "../types/order.type";
import useOrders from "../hook/useOrders";
import PageLoader from "../utils/PageLoader";
import axiosSecure from "../hook/useAxios";
import OrderItemCard from "./OrderItemCard";

type TOrderItemPageRenderer = {
  currentStatus: string;
  nextStatus: string | null;
  buttonLabel: string | null;
};

const OrderItemPageRenderer = ({
  currentStatus,
  nextStatus,
  buttonLabel,
}: TOrderItemPageRenderer) => {
  const { ordersData, ordersLoading, ordersRefetch } = useOrders({
    status: currentStatus,
  });
  const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ordersData.length) {
      setSelectedOrder(ordersData[0]); // Set the first order by default
    }
  }, [ordersData]);

  if (ordersLoading) return <PageLoader />;

  const handleOrderStatusUpdate = async (orderId: string, status: string) => {
    try {
      setLoading(true);
      const res = await axiosSecure.patch(
        `/orders/update-order-status/${orderId}`,
        { status }
      );
      if (res.status === 200) {
        toast.success("Status updated!");
        ordersRefetch();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {ordersData.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-10">
          {/* Sidebar */}
          <aside className="border border-dark rounded-lg max-h-[80vh] overflow-y-auto">
            <div className="h-12 sticky top-0 flex items-center justify-center txt-xl font-bold bg-zinc-500 text-white">
              Items: {ordersData.length}
            </div>
            {ordersData.map((order: TOrder) => (
              <div
                key={order._id}
                onClick={() => setSelectedOrder(order)}
                className={`p-3 cursor-pointer border-b  ${
                  selectedOrder?._id === order._id
                    ? "bg-primary text-zinc-200"
                    : "hover:bg-gray-100"
                }`}
              >
                <p className="font-semibold ">
                  Order #{order._id.substring(0, 10)}
                </p>

                <div className="flex justify-between items-end gap-5">
                  <div>
                    <p className="text-sm mb-2">
                      {format(new Date(order.createdAt), "dd MMM, yyyy")}
                    </p>

                    <p
                      className={`px-1 rounded text-white w-fit text-sm ${
                        order.paymentStatus === "cod"
                          ? "bg-red-500"
                          : "bg-green-500"
                      }`}
                    >
                      {order.paymentStatus}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${order.totalAmount}</p>
                    <p>
                      <span className="font-semibold">
                        {order.items.length}
                      </span>{" "}
                      items
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </aside>

          {/* Content */}
          <section className="md:col-span-3 border border-dark rounded-lg p-4">
            {selectedOrder ? (
              <>
                {/* Top Section */}
                <div className="border-b mb-5 flex justify-between items-center gap-5 pb-3">
                  <h2 className="text-xl font-bold">
                    Order #{selectedOrder._id.substring(0, 10)}
                  </h2>
                  {nextStatus && buttonLabel && (
                    <div className="flex items-center gap-5">
                      <button
                        disabled={loading}
                        onClick={() =>
                          handleOrderStatusUpdate(selectedOrder._id, nextStatus)
                        }
                        className="bg-green-500 text-white px-3 py-1 rounded cursor-pointer duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {buttonLabel}
                      </button>
                      <button
                        disabled={loading}
                        onClick={() =>
                          handleOrderStatusUpdate(
                            selectedOrder._id,
                            "cancelled"
                          )
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                {/* Middle Section */}
                <div className="flex justify-between gap-5">
                  <div>
                    <p className="text-2xl font-bold mb-3">
                      {selectedOrder.number}
                    </p>
                    <p className="text-lg font-semibold mb-2">
                      {(selectedOrder.userId as any).name}
                    </p>
                    <p>
                      <strong>Address:</strong>{" "}
                      {selectedOrder.shippingAddress.street},{" "}
                      {selectedOrder.shippingAddress.city},{" "}
                      {selectedOrder.shippingAddress.postalCode}
                    </p>
                    <p>
                      <strong>Note:</strong> {selectedOrder.note || "No notes"}
                    </p>
                  </div>

                  <div>
                    <p>
                      <strong>Order Date:</strong>{" "}
                      {format(
                        new Date(selectedOrder.createdAt),
                        "dd MMM, yyyy"
                      )}
                    </p>
                    <p>
                      <strong>Total:</strong> ${selectedOrder.totalAmount}
                    </p>

                    <p>
                      <strong>Payment:</strong>{" "}
                      <span
                        className={`px-1 rounded text-white w-fit text-sm ${
                          selectedOrder.paymentStatus === "cod"
                            ? "bg-red-500"
                            : "bg-green-500"
                        }`}
                      >
                        {selectedOrder.paymentStatus}
                      </span>
                    </p>
                    <p>
                      <strong>Status:</strong> {selectedOrder.status}
                    </p>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mt-4 mb-2">Items:</h3>
                {selectedOrder.items.map((item, idx) => (
                  <OrderItemCard
                    key={idx}
                    productId={item.productId}
                    quantity={item.quantity}
                    price={item.price}
                  />
                ))}
              </>
            ) : (
              <p className="text-center">No order selected or empty basket</p>
            )}
          </section>
        </section>
      ) : (
        <p className="text-2xl text-center mt-20 font-semibold">
          No Product Found
        </p>
      )}
    </>
  );
};

export default OrderItemPageRenderer;
