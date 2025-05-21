import { ShoppingBasket } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="max-w-[1400px] mx-auto sticky top-0 bg-white">
      <nav className="flex justify-between items-center p-4">
        <Link to="/">
          <h1 className="text-xl md:text-3xl font-bold cursor-pointer">
            Shoppo
          </h1>
        </Link>
        <Link
          to="/cart"
          className="p-2 hover:bg-slate-200 hover:rounded-xl cursor-pointer relative"
        >
          <div className={`h-3 w-3 rounded-xl absolute right-1 top-1`} />
          <ShoppingBasket size={30} />
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
