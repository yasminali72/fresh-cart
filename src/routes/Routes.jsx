import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Products from "../Components/Products/Products";
import Brands from "../Components/Brands/Brands";
import Categories from "../Components/Categories/Categories";
import NotFound from "../Components/NotFound/NotFound";
import Cart from "../Components/Cart/Cart";

import Register from "../Components/Register/Register";
import Login from "../Components/Login/Login";
import Layout from "../Components/Layout/Layout";
import ProtectedRoute from "../Components/ProtectedRoute/ProtectedRoute";
import AuthRoute from "../Components/AuthRoute/AuthRoute";
import ProductDetails from "../Components/ProductDetails/ProductDetails";
import Orders from "../Components/Orders/Orders";
import ForgetPassword from "../Components/ForgetPassword/ForgetPassword";
import ResetPassword from "../Components/ResetPassword/ResetPassword";
import VerifyResetCode from "../Components/VerifyResetCode/VerifyResetCode";
import WishList from "../Components/WishList/WishList";
import Payment from "../Components/Payment/Payment";
import Home from "../Components/Home/Home";
import SpecificProducts from "../Components/SpecificProducts/SpecificProducts";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: (
          <AuthRoute>
            <Login />
          </AuthRoute>
        ),
      },
      {
        path: "register",
        element: (
          <AuthRoute>
            <Register />
          </AuthRoute>
        ),
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "specificProducts/:id",
        element: <SpecificProducts />,
      },

      {
        path: "brands",
        element: <Brands />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishList",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "productDetails/:id",
        element: <ProductDetails />,
      },
      {
        path: "payment/:cartId",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "forgetPassword",
        element: (
          <AuthRoute>
            <ForgetPassword />
          </AuthRoute>
        ),
      },
      {
        path: "verifyResetCode",
        element: (
          <AuthRoute>
            <VerifyResetCode />
          </AuthRoute>
        ),
      },
      {
        path: "resetPassword",
        element: (
          <AuthRoute>
            <ResetPassword />
          </AuthRoute>
        ),
      },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function Routes() {
  return <RouterProvider router={router}></RouterProvider>;
}
