import { useQuery } from "@tanstack/react-query";
import axiosSecure from "./useAxios";

const useOrders = () => {
  const {
    data: ordersData = [],
    isLoading: ordersLoading,
    refetch: ordersRefetch,
  } = useQuery({
    queryKey: ["ordersData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders`);
      return res.data?.data;
    },
  });

  return { ordersData, ordersLoading, ordersRefetch };
};

export default useOrders;
