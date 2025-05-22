import { NavLink } from "react-router-dom";

const OrderNavItems = () => {
  return (
    <ul className="flex gap-3">
      <li className="flex flex-1">
        <NavLink
          to="pending"
          className={({ isActive }) =>
            isActive
              ? " bg-primary text-white w-full text-sm md:text-base px-3 py-2 rounded"
              : "border border-gray-200 rounded px-3 py-2 w-full text-sm md:text-base"
          }
        >
          New Orders
        </NavLink>
      </li>
      <li className="flex flex-1">
        <NavLink
          to="packaging"
          className={({ isActive }) =>
            isActive
              ? " bg-primary w-full text-sm md:text-base text-white px-3 py-2 rounded"
              : "border border-gray-200 rounded  px-3 py-2 w-full text-sm md:text-base"
          }
        >
          Packaging
        </NavLink>
      </li>
      <li className="flex flex-1">
        <NavLink
          to="ready-to-ship"
          className={({ isActive }) =>
            isActive
              ? " bg-primary w-full text-sm md:text-base text-white px-3 py-2 rounded"
              : "border border-gray-200 rounded w-full text-sm md:text-base px-3 py-2"
          }
        >
          Ready to Ship
        </NavLink>
      </li>
      <li className="flex flex-1">
        <NavLink
          to="on-the-way"
          className={({ isActive }) =>
            isActive
              ? " bg-primary w-full text-sm md:text-base text-white px-3 py-2 rounded"
              : "border border-gray-200 rounded w-full text-sm md:text-base px-3 py-2"
          }
        >
          On the Way
        </NavLink>
      </li>
      <li className="flex flex-1">
        <NavLink
          to="delivered"
          className={({ isActive }) =>
            isActive
              ? " bg-primary w-full text-sm md:text-base text-white px-3 py-2 rounded"
              : "border border-gray-200 rounded w-full text-sm md:text-base px-3 py-2"
          }
        >
          Delivered
        </NavLink>
      </li>
      <li className="flex flex-1">
        <NavLink
          to="cancelled"
          className={({ isActive }) =>
            isActive
              ? " bg-primary w-full text-sm md:text-base text-white px-3 py-2 rounded"
              : "border border-gray-200 rounded w-full text-sm md:text-base px-3 py-2"
          }
        >
          Cancelled
        </NavLink>
      </li>
    </ul>
  );
};

export default OrderNavItems;
