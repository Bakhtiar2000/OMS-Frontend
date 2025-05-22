import { Mail, Users, FileText } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import useUsers from "../../../hook/useUsers";
import useOrders from "../../../hook/useOrders";

const AdminHome = () => {
  const { user } = useAuth();

  const { usersData } = useUsers();
  const { ordersData } = useOrders({ status: "pending" });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4">
      <h2 className="text-2xl md:text-4xl font-semibold text-center">
        Welcome Home, Mr. {user?.name}
      </h2>
      <p className="flex items-center gap-2 mt-2 text-gray-600">
        <Mail className="w-5 h-5" /> {user?.email}
      </p>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 w-full max-w-6xl">
        {/* Card 1 - Users */}
        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center">
          <Users className="text-blue-500 w-8 h-8 mb-2" />
          <h4 className="text-xl font-bold">{usersData.length} Users</h4>
          <p className="text-gray-500 text-sm mt-1">Total Registered Users</p>
        </div>

        {/* Card 2 - Plans */}
        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center">
          <FileText className="text-orange-500 w-8 h-8 mb-2" />
          <h4 className="text-xl font-bold">
            {ordersData.length} Orders pending
          </h4>
          <p className="text-gray-500 text-sm mt-1">New Orders</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
