import useSingleProduct from "../hook/useSingleProduct";
import type { TProduct } from "../types/product.type";

type TOrderItem = {
  productId: string;
  quantity: number;
  price: number;
};

const OrderItemCard = ({ productId, quantity, price }: TOrderItem) => {
  const { singleProductData, singleProductLoading } =
    useSingleProduct(productId);

  if (singleProductLoading) return <p>Loading product...</p>;
  if (!singleProductData) return <p>Product not found</p>;

  const product: TProduct = singleProductData;

  return (
    <div className="flex justify-between gap-5  border p-2 rounded mb-2">
      <div className="flex items-center gap-4">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div className="flex-1">
          <h4 className="font-semibold">{product.name}</h4>
          <p className="text-sm text-zinc-500">Qty: {quantity}</p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-end">
        <p className="text-sm text-zinc-500">Unit Price: ${price.toFixed(2)}</p>
        <p className="font-medium">
          Subtotal: ${(price * quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default OrderItemCard;
