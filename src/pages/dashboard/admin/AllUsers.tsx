import { Loader2 } from "lucide-react";
import useUsers from "../../../hook/useUsers";
import UsersTableRow from "../../../component/UsersTableRow";

const AllUsers = () => {
  const { usersData, usersLoading, usersRefetch } = useUsers();
  console.log(usersData);
  return (
    <div className="max-w-5xl mx-auto py-20 md:pt-24 px-8 lg:px-4">
      <h2 className="text-2xl font-semibold text-center mb-4">
        All users in Shoppo
      </h2>

      <div className="overflow-x-auto">
        {usersLoading ? (
          <div className="flex justify-center items-center py-20 text-4xl">
            <Loader2 className="w-16 h-16 animate-spin" />
          </div>
        ) : usersData.length > 0 ? (
          <table className="text-center text-black w-full">
            <thead>
              <tr className="bg-primary text-white h-12">
                <th>Sl</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {usersData?.map((user: any, index: number) => (
                <UsersTableRow
                  key={user._id}
                  user={user}
                  index={index}
                  refetch={usersRefetch}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div>
            <p className="text-center">No Users Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
