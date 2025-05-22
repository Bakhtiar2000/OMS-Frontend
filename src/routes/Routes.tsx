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
      { path: "orders", element: <AllOrders /> },
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
