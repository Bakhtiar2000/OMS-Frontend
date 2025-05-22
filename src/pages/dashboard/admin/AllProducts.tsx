import { Loader2, X } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useProducts from "../../../hook/useProducts";
import type { TProduct } from "../../../types/product.type";
import axiosSecure from "../../../hook/useAxios";
import ProductsTableRow from "../../../component/ProductsTableRow";

const AllProducts = () => {
  const { productsData, productsLoading, productsRefetch } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TProduct>();

  const handleImage = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (!e) {
      setImagePreview(null);
      if (imageRef.current) imageRef.current.value = "";
      return;
    }

    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      if (imageRef.current) imageRef.current.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCreateProduct = async (data: TProduct) => {
    const formData = new FormData();
    const productInfo = {
      name: data.name,
      description: data.description,
      price: parseInt(data.price.toString()),
      stock: parseInt(data.stock.toString()),
    };

    if (imageRef.current?.files?.[0])
      formData.append("file", imageRef.current?.files?.[0]);
    formData.append("data", JSON.stringify(productInfo));

    try {
      setLoading(true);
      await axiosSecure.post(`/products/add-a-product`, formData);
      toast.success("Product added successfully!");
      reset();
      productsRefetch();
      setIsModalOpen(false);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to add Product!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-20 md:pt-24 px-8 lg:px-4">
      <h2 className="text-2xl font-semibold text-center mb-4">
        All Products in Shoppo
      </h2>

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-primary px-5 py-2 rounded text-white text-sm font-semibold mb-4"
      >
        Create A Product
      </button>
      <div className="overflow-x-auto">
        {productsLoading ? (
          <div className="flex justify-center items-center py-20 text-4xl">
            <Loader2 className="w-16 h-16 animate-spin" />
          </div>
        ) : productsData.length > 0 ? (
          <table className="text-center w-full">
            <thead>
              <tr className="bg-primary text-white h-12">
                <th>Sl</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody className="">
              {productsData?.map((product: any, index: number) => (
                <ProductsTableRow
                  key={index}
                  product={product}
                  index={index}
                  refetch={productsRefetch}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div>
            <p className="text-center">No products Found</p>
          </div>
        )}
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-zinc-900  mb-4">
              Add a product
            </h2>
            <form
              onSubmit={handleSubmit(handleCreateProduct)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 ">
                  Image <span className="text-red-500">*</span>
                </label>
                {imagePreview && (
                  <div className="mb-2 relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Image Preview"
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => handleImage(null)}
                      className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={imageRef}
                  onChange={(e) => handleImage(e)}
                  className="hidden"
                />
                <button
                  type="button"
                  className="w-full mt-1 p-2 border rounded outline-none focus:border-green-500 bg-white"
                  onClick={() => imageRef.current?.click()}
                >
                  Add Product Thumbnail
                </button>
              </div>
              {/*  name */}
              <div>
                <label className="block text-left text-sm font-medium text-gray-700">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("name", {
                    required: "Name is required",
                  })}
                  className="w-full mt-1 p-2 border rounded outline-none focus:border-green-500 bg-white"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/*  Description */}
              <div>
                <label className="block text-left text-sm font-medium text-gray-700">
                  Description <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("description", {
                    required: "description is required",
                  })}
                  className="w-full mt-1 p-2 border rounded outline-none focus:border-green-500 bg-white"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/*  Price */}
              <div>
                <label className="block text-left text-sm font-medium text-gray-700">
                  Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  {...register("price", {
                    required: "price is required",
                  })}
                  className="w-full mt-1 p-2 border rounded outline-none focus:border-green-500 bg-white"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>

              {/*  Stock */}
              <div>
                <label className="block text-left text-sm font-medium text-gray-700">
                  Stock <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  {...register("stock", {
                    required: "stock is required",
                  })}
                  className="w-full mt-1 p-2 border rounded outline-none focus:border-green-500 bg-white"
                />
                {errors.stock && (
                  <p className="text-red-500 text-sm">{errors.stock.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="col-span-2 w-full bg-primary text-white py-2 rounded transition"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                ) : (
                  "Add Product"
                )}
              </button>
            </form>
            <button
              className="text-red-500 absolute top-2 right-2  hover:text-zinc-900 "
              onClick={() => setIsModalOpen(false)}
            >
              <X />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
