import { useQuery } from "@tanstack/react-query";
import axiosSecure from "./useAxios";

const useCarts = () => {
  const {
    data: cartsData = [],
    isLoading: cartsLoading,
    refetch: cartsRefetch,
  } = useQuery({
    queryKey: ["cartsData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts`);
      return res.data?.data;
    },
  });

  return { cartsData, cartsLoading, cartsRefetch };
};

export default useCarts;
