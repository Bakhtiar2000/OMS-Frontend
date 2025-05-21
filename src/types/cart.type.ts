export type TCartItem = {
  productId: string;
  quantity: number;
};

export type TCart = {
  _id: string;
  userId: string;
  items: TCartItem[];
  createdAt: Date;
  updatedAt: Date;
};
