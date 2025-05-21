export type TAddress = {
  street: string;
  city: "Dhaka" | "Chittagong";
  postalCode: number;
};

export type TOrderItem = {
  productId: string;
  quantity: number;
  price: number;
};

export type TOrder = {
  _id: string;
  userId: string;
  number: string;
  note: string;
  items: TOrderItem[];
  totalAmount: number;
  status:
    | "pending"
    | "packaging"
    | "ready_to_ship"
    | "on_the_way"
    | "delivered"
    | "cancelled";
  paymentStatus: "paid" | "cod" | "refunded";
  shippingAddress: TAddress;
  createdAt: Date;
  updatedAt: Date;
};
