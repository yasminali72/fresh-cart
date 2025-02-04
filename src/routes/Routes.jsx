import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Products from "../Components/Products/Products";
import Brands from "../Components/Brands/Brands";
import Categories from "../Components/Categories/Categories";
import NotFound from "../Components/NotFound/NotFound";
import Cart from "../Components/Cart/Cart";

import Register from "../Components/Register/Register";
import Login from "../Components/Login/Login";
import Layout from "../Components/Layout/Layout";
import ProductedRoute from "../Components/ProductedRoute/ProductedRoute";
import ProdectAuthRoute from "../Components/ProdectAuthRoute/ProdectAuthRoute";
import ProductDetails from "../Components/ProductDetails/ProductDetails";
import Orders from "../Components/Orders/Orders";
import ForgetPassword from "../Components/ForgetPassword/ForgetPassword";
import ResetPassword from "../Components/ResetPassword/ResetPassword";
import VerifyResetCode from "../Components/VerifyResetCode/VerifyResetCode";
import WishList from "../Components/WishList/WishList";
import Payment from "../Components/Payment/Payment";
import Home from "../Components/Home/Home";

  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            
              <Home />
          ),
        },
        {
          path: "login",
          element: (
            <ProdectAuthRoute>
              <Login />
            </ProdectAuthRoute>
          ),
        },
        {
          path: "register",
          element: (
            <ProdectAuthRoute>
              <Register />
            </ProdectAuthRoute>
          ),
        },
        {
          path: "products",
          element: (
           
              <Products />
          ),
        },
        {
          path: "brands",
          element: (
           
              <Brands />
            
          ),
        },
        {
          path: "categories",
          element: (
           
              <Categories />
           
          ),
        },
        {
          path: "cart",
          element: (
            <ProductedRoute>
              <Cart />
            </ProductedRoute>
          ),
        },
        {
          path: "wishList",
          element: (
            <ProductedRoute>
              <WishList />
            </ProductedRoute>
          ),
        },
        {
          path: "productDetails/:id",
          element: (
           
              <ProductDetails />
           
          ),
        },
        {
          path: "payment/:cartId",
          element: (
            <ProductedRoute>
              <Payment />
            </ProductedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProductedRoute>
              <Orders />
            </ProductedRoute>
          ),
        },
        {
          path: "forgetPassword",
          element: (
            <ProdectAuthRoute>
              <ForgetPassword />
            </ProdectAuthRoute>
          ),
        },
        {
          path: "verifyResetCode",
          element: (
            <ProdectAuthRoute>
              <VerifyResetCode />
            </ProdectAuthRoute>
          ),
        },
        {
          path: "resetPassword",
          element: (
            <ProdectAuthRoute>
              <ResetPassword />
            </ProdectAuthRoute>
          ),
        },

        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  
  export default function Routes() {
    return (
      <RouterProvider router={router}>

      </RouterProvider>
    )
  }
 
  