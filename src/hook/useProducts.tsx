import { useQuery } from "@tanstack/react-query";
import axiosSecure from "./useAxios";

const useProducts = () => {
  const {
    data: productsData = [],
    isLoading: productsLoading,
    refetch: productsRefetch,
  } = useQuery({
    queryKey: ["productsData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products`);
      return res.data?.data;
    },
  });

  return { productsData, productsLoading, productsRefetch };
};

export default useProducts;
