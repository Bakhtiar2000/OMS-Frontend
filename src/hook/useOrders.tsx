import { useQuery } from "@tanstack/react-query";
import axiosSecure from "./useAxios";

const useOrders = (
  queryParams?: Record<string, string | number | undefined>
) => {
  const queryString = queryParams
    ? `?${new URLSearchParams(
        Object.fromEntries(
          Object.entries(queryParams).filter(
            ([_, value]) => value !== undefined && value !== ""
          )
        ) as Record<string, string>
      ).toString()}`
    : "";
  const {
    data: ordersData = [],
    isLoading: ordersLoading,
    refetch: ordersRefetch,
  } = useQuery({
    queryKey: ["ordersData", queryParams],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders${queryString}`);
      return res.data?.data;
    },
  });

  return { ordersData, ordersLoading, ordersRefetch };
};

export default useOrders;
