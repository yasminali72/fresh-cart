import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Layout from "./Components/Layout/Layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Brands from "./Components/Brands/Brands";
import Categories from "./Components/Categories/Categories";
import NotFound from "./Components/NotFound/NotFound";
import Cart from "./Components/Cart/Cart";
import AuthContextProvider, { AuthContext } from "./Contexts/AuthContext";
import ProductedRoute from "./Components/ProductedRoute/ProductedRoute";
import ProdectAuthRoute from "./Components/ProdectAuthRoute/ProdectAuthRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { ToastContainer, toast } from "react-toastify";
import ShippingAddress from "./Components/Payment/Payment";
import Orders from "./Components/Orders/Orders";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import VerifyResetCode from "./Components/VerifyResetCode/VerifyResetCode";
import WishList from "./Components/WishList/WishList";
import { Offline, Online } from "react-detect-offline";
import Payment from "./Components/Payment/Payment";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {

const queryClient=new QueryClient()

  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProductedRoute>
              {" "}
              <Home />
            </ProductedRoute>
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
            <ProductedRoute>
              <Products />{" "}
            </ProductedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProductedRoute>
              <Brands />
            </ProductedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProductedRoute>
              <Categories />
            </ProductedRoute>
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
            <ProductedRoute>
              <ProductDetails />
            </ProductedRoute>
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
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer newestOnTop={true} />
        <Offline>
          <div className="bg-yellow-400 fixed bottom-4 start-4 rounded-md p-2">
            Only shown offline (surprise!)
          </div>
        </Offline>
      </AuthContextProvider>
     <ReactQueryDevtools/>
      </QueryClientProvider>
    </>
  );
}

export default App;
