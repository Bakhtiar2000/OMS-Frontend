import { useQuery } from "@tanstack/react-query";
import axiosSecure from "./useAxios";
import { useAuth } from "../context/AuthContext";

const useMyCart = () => {
  const { user } = useAuth();

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
    enabled: !!user, // Prevents fetching until user is available
  });

  return { myCartData, myCartLoading, myCartRefetch };
};

export default useMyCart;
