import type { TProduct } from "../types/product.type";

type TProductData = {
  product: TProduct;
  refetch: () => void;
  index: number;
};

const ProductsTableRow = ({ product, index }: TProductData) => {
  return (
    <>
      <tr className="text-xs sm:text-base h-12 border-b">
        <th>{index + 1}</th>
        <td>
          <img
            className="w-10 h-10 object-cover object-center mx-auto rounded"
            src={product.imageUrl}
            alt={product.name}
          />
        </td>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>{product.stock}</td>
      </tr>
    </>
  );
};

export default ProductsTableRow;
