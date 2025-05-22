import { useQuery } from "@tanstack/react-query";
import axiosSecure from "./useAxios";

const useMyOrders = () => {
  const {
    data: myOrdersData = [],
    isLoading: myOrdersLoading,
    refetch: myOrdersRefetch,
  } = useQuery({
    queryKey: ["myOrdersData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/my-orders`);
      return res.data?.data;
    },
  });

  return { myOrdersData, myOrdersLoading, myOrdersRefetch };
};

export default useMyOrders;
