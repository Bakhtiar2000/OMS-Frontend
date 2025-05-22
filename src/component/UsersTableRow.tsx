import { useState } from "react";
import toast from "react-hot-toast";
import type { TUser } from "../types/user.type";
import axiosSecure from "../hook/useAxios";

interface TUserData {
  user: TUser;
  refetch: () => void;
  index: number;
}

const UsersTableRow = ({ user, refetch, index }: TUserData) => {
  const [isActive, setIsActive] = useState<boolean>(
    user?.status == "in-progress" ? true : false
  );

  const handleUserStatus = () => {
    axiosSecure
      .patch(`/users/change-status/${user._id}`, {
        status: user.status === "in-progress" ? "blocked" : "in-progress",
      })
      .then((res) => {
        if (res.status === 200) {
          refetch();
          toast.success(`Mr. ${user.name}'s status updated!`);
          setIsActive((prev) => !prev);
        }
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message || "Failed to update user state"
        );
      });
  };

  return (
    <tr className="text-xs sm:text-base bg-white border-b h-12">
      <th className="">{index + 1}</th>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <select
          value={isActive ? "in-progress" : "blocked"}
          onChange={() => handleUserStatus()}
          className={`text-xs text-white sm:text-sm rounded-lg px-1 max-w-20 cursor-pointer ${
            isActive ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <option value="in-progress">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </td>
    </tr>
  );
};

export default UsersTableRow;
