import useMyOrders from "../hook/useMyOrder";
import { format } from "date-fns";
import type { TOrder } from "../types/order.type";
import OrderItemCard from "../component/OrderItemCard";

const TrackOrderPage = () => {
  const { myOrdersData, myOrdersLoading } = useMyOrders();

  if (myOrdersLoading) return <p>Loading orders...</p>;

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">My Orders</h2>

      {myOrdersData.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-5">
          {myOrdersData.map((order: TOrder) => (
            <div
              key={order._id}
              className="border border-gray-300 rounded-lg p-4 shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-primary font-semibold">
                    Order ID: {order._id.substring(0, 10)}
                  </p>
                  <p className="text-sm text-zinc-500">
                    {format(new Date(order.createdAt), "dd MMM, yyyy")}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className="font-semibold bg-primary text-white px-3  py-1 rounded">
                    {order.status}
                  </p>
                  <p
                    className={`inline-block text-xs w-fit px-2 py-1 rounded text-white ${
                      order.paymentStatus === "paid"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {order.paymentStatus}
                  </p>
                </div>
              </div>

              {order.note && (
                <p className="mb-2 text-sm text-gray-600">
                  <span className="font-medium">Note:</span> {order.note}
                </p>
              )}

              <p className="mb-2 text-sm text-gray-600">
                <span className="font-medium">Items:</span> {order.items.length}
              </p>

              {order.items.map((item, idx) => (
                <OrderItemCard
                  key={idx}
                  productId={item.productId}
                  quantity={item.quantity}
                  price={item.price}
                />
              ))}

              <p className="mb-2 text-sm text-gray-600">
                <span className="font-medium">Total:</span> ${order.totalAmount}
              </p>

              <div className="mt-2 text-sm text-gray-700">
                <p className="font-medium">Shipping Address:</p>
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city} -{" "}
                  {order.shippingAddress.postalCode}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackOrderPage;
