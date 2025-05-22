import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import CartPage from "../pages/CartPage";
import OrderPage from "../pages/OrderPage";
import SingleProductPage from "../pages/SingleProductPage";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layout/DashboardLayout";
import AdminPrivateRoute from "./AdminPrivateRoute";
import AdminHome from "../pages/dashboard/admin/AdminHome";
import AllUsers from "../pages/dashboard/admin/AllUsers";
import AllOrders from "../pages/dashboard/admin/AllOrders";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import TrackOrderPage from "../pages/TrackOrderPage";
import AllProducts from "../pages/dashboard/admin/AllProducts";
import OrderItemPageRenderer from "../component/OrderItemPageRenderer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "products/:id", element: <SingleProductPage /> },
      {
        path: "cart",
        element: (
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        ),
      },
      {
        path: "order",
        element: (
          <PrivateRoute>
            <OrderPage />
          </PrivateRoute>
        ),
      },
      {
        path: "track-order",
        element: (
          <PrivateRoute>
            <TrackOrderPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <AdminPrivateRoute>
        <DashboardLayout />
      </AdminPrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: "admin-home", element: <AdminHome /> },
      { path: "users", element: <AllUsers /> },
      { path: "products", element: <AllProducts /> },
      {
        path: "orders",
        element: <AllOrders />,
        children: [
          {
            path: "pending",
            element: (
              <OrderItemPageRenderer
                currentStatus="pending"
                nextStatus="packaging"
                buttonLabel="Accept"
              />
            ),
          },
          {
            path: "packaging",
            element: (
              <OrderItemPageRenderer
                currentStatus="packaging"
                nextStatus="ready_to_ship"
                buttonLabel="Ready to Ship"
              />
            ),
          },
          {
            path: "ready-to-ship",
            element: (
              <OrderItemPageRenderer
                currentStatus="ready_to_ship"
                nextStatus="on_the_way"
                buttonLabel="Courier Handoff"
              />
            ),
          },
          {
            path: "on-the-way",
            element: (
              <OrderItemPageRenderer
                currentStatus="on_the_way"
                nextStatus="delivered"
                buttonLabel="Mark Delivered"
              />
            ),
          },
          {
            path: "delivered",
            element: (
              <OrderItemPageRenderer
                currentStatus="delivered"
                nextStatus={null}
                buttonLabel={null}
              />
            ),
          },
          {
            path: "cancelled",
            element: (
              <OrderItemPageRenderer
                currentStatus="cancelled"
                nextStatus={null}
                buttonLabel={null}
              />
            ),
          },
        ],
      },
    ],
  },
  { path: "register", element: <RegisterPage /> },
  { path: "login", element: <LoginPage /> },
  {
    path: "reset-password",
    element: <ResetPasswordPage />,
  },
]);

export default router;
