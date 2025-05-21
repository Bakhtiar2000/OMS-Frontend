import { FaCartPlus, FaHome } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { IoCardOutline, IoHomeOutline, IoLogOutOutline } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdComment } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import ActiveLink from "../utils/ActiveLink";

const DashboardLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-dark text-black dark:text-white">
      {/* Sidebar toggle button for small screens */}
      <input type="checkbox" id="sidebar-toggle" className="peer hidden" />

      {/* Sidebar */}
      <aside className="fixed z-50 top-0 left-0 h-full w-64 bg-title text-white transform -translate-x-full peer-checked:translate-x-0 lg:translate-x-0 transition-transform duration-300 lg:relative lg:top-auto lg:left-auto lg:h-auto lg:flex lg:flex-col">
        <div className="flex flex-col h-full p-4">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Link to="/" className="flex items-center gap-3">
              {/* <img className="w-32" src={logo} alt="Logo" /> */}
            </Link>
          </div>

          {/* Nav Items */}
          <ul className="space-y-3 flex-1">
            <li>
              <ActiveLink to="/dashboard/admin-home">
                <div className="flex items-center gap-2 text-sm sm:text-base">
                  <FaHome /> Admin Home
                </div>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink to="/dashboard/manage-products">
                <div className="flex items-center gap-2 text-sm sm:text-base">
                  <FaCartPlus /> Manage Products
                </div>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink to="/dashboard/manage-agent">
                <div className="flex items-center gap-2 text-sm sm:text-base">
                  <IoCardOutline /> Manage Agent
                </div>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink to="/dashboard/manage-review">
                <div className="flex items-center gap-2 text-sm sm:text-base">
                  <MdComment /> Manage Review
                </div>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink to="/dashboard/change-password">
                <div className="flex items-center gap-2 text-sm sm:text-base">
                  <RiLockPasswordFill /> Change Password
                </div>
              </ActiveLink>
            </li>

            <div className="border-t border-white/40 my-5" />

            <li>
              <ActiveLink to="/">
                <div className="flex items-center gap-2 text-sm sm:text-base">
                  <IoHomeOutline /> Back to Home Page
                </div>
              </ActiveLink>
            </li>
            <li onClick={logout}>
              <ActiveLink to="/login">
                <div className="flex items-center gap-2 text-sm sm:text-base bg-red-500 rounded px-3 py-1">
                  <IoLogOutOutline />
                  Logout
                </div>
              </ActiveLink>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:ml-64">
        {/* Toggle Button for mobile */}
        <label
          htmlFor="sidebar-toggle"
          className="block lg:hidden text-2xl font-bold cursor-pointer mb-4"
        >
          ☰
        </label>

        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
