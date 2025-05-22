import toast from "react-hot-toast";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import type { TProduct } from "../types/product.type";
import axiosSecure from "../hook/useAxios";

type TProductData = {
  product: TProduct;
  refetch: () => void;
  index: number;
};

const ProductsTableRow = ({ product, refetch, index }: TProductData) => {
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
