import { LogIn, LogOut } from "lucide-react";
import { BsCartPlusFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { HiViewGrid } from "react-icons/hi";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="max-w-[1400px] mx-auto sticky top-0 bg-white z-50">
      <nav className="flex justify-between items-center p-4">
        <Link to="/">
          <h1 className="text-xl md:text-3xl font-bold cursor-pointer">
            Shoppo
          </h1>
        </Link>
        <div className="flex items-center gap-5">
          {user && (
            <p className="font-semibold">Hello, {user.name.split(" ")[0]} 👋</p>
          )}
          {user && user.role !== "admin" ? (
            <Link
              to="/cart"
              className="p-2 hover:bg-slate-200 hover:rounded-xl cursor-pointer relative group"
            >
              {/* <div className="h-3 w-3 rounded-xl absolute right-1 top-1" /> */}
              <BsCartPlusFill size={30} />
              <span className="absolute z-30 left-1/2 top-full mt-2 mb-2 w-max -translate-x-1/2 scale-0 transition-all rounded bg-green-500 px-1 pb-0.5 text-xs text-white group-hover:scale-100">
                Cart
              </span>
            </Link>
          ) : (
            <Link
              to="/dashboard/admin-home"
              className="p-2 hover:bg-slate-200 hover:rounded-xl cursor-pointer relative group"
            >
              <HiViewGrid size={30} />
              <span className="absolute z-30 left-1/2 top-full mt-2 mb-2 w-max -translate-x-1/2 scale-0 transition-all rounded bg-green-500 px-1 pb-0.5 text-xs text-white group-hover:scale-100">
                Dashboard
              </span>
            </Link>
          )}

          {!user ? (
            <Link
              to="/login"
              className="p-2 hover:bg-green-200 text-green-500 hover:rounded-xl cursor-pointer duration-300 relative group"
              aria-label="Login"
            >
              <LogIn size={30} />
              <span className="absolute z-30 left-1/2 top-full mt-2 mb-2 w-max -translate-x-1/2 scale-0 transition-all rounded bg-green-500 px-1 pb-0.5 text-xs text-white group-hover:scale-100">
                Login
              </span>
            </Link>
          ) : (
            <button
              onClick={logout}
              className="p-2 hover:bg-red-200 text-red-500 hover:rounded-xl cursor-pointer duration-300 relative group"
              aria-label="Logout"
            >
              <LogOut size={30} />
              <span className="absolute z-30 left-1/2 top-full mt-2 mb-2 w-max -translate-x-1/2 scale-0 transition-all rounded bg-red-500 px-1 pb-0.5 text-xs text-white group-hover:scale-100">
                Logout
              </span>
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
