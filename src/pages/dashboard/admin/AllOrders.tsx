import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import OrderNavItems from "../../../component/OrderNavItems";

const AllOrders = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard/orders/pending", { replace: true });
  }, [navigate]);
  return (
    <section className="p-5">
      <header>
        <OrderNavItems />
      </header>

      <section>
        <Outlet />
      </section>
    </section>
  );
};

export default AllOrders;
