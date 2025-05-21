import { useQuery } from "@tanstack/react-query";
import axiosSecure from "./useAxios";

const useMyCart = () => {
  const {
    data: myCartData = [],
    isLoading: myCartLoading,
    refetch: myCartRefetch,
  } = useQuery({
    queryKey: ["myCartData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts`);
      return res.data?.data;
    },
  });

  return { myCartData, myCartLoading, myCartRefetch };
};

export default useMyCart;
