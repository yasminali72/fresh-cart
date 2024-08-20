import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../Contexts/AuthContext";
import { Bounce, toast } from "react-toastify";
import Loading from "../Loading/Loading";
import { formatNumber } from "../../currency";
import CartProduct from "../CartProduct/CartProduct";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
export default function Cart() {
  
  const [productsCart, setProductsCart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getUserCart();
  }, []);

  async function getUserCart() {
    setIsLoading(true);
    let { data } = await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .catch(() => {
        setIsLoading(false);
      });

    setProductsCart(data);

    setIsLoading(false);
  }

  async function clearCart() {
    let { data } = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setProductsCart(null);
  }

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>

      {isLoading ? (
        <Loading />
      ) : productsCart ? (
        <div className="bg-gray-100 h-auto py-8 dark:bg-Dark">
          <div className="container mx-auto px-4 dark:bg-Dark">
            <h1 className="text-2xl font-semibold mb-4">
              Shopping Cart ({productsCart?.numOfCartItems})
            </h1>
            <div className="flex flex-col md:flex-row gap-4 ">
              <div className="md:w-3/4">
                <div className="bg-white rounded-lg shadow-md p-6 mb-4 dark:bg-Dark ">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left font-semibold">Product</th>
                        <th className="text-left font-semibold">Price</th>
                        <th className="text-left font-semibold ">Quantity</th>
                        <th className="text-left font-semibold">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productsCart?.data.products.map((product, index) => {
                        return (
                          <CartProduct
                            key={index}
                            product={product}
                            setProductsCart={setProductsCart}
                            productsCart={productsCart}
                          />
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="md:w-1/4  ">
                <div className="bg-white rounded-lg shadow-md p-6 dark:bg-Dark">
                  <h2 className="text-lg font-semibold mb-4">Summary</h2>
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>
                      ${formatNumber(productsCart?.data.totalCartPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Taxes</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Shipping</span>
                    <span>$0.00</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">
                      ${formatNumber(productsCart?.data.totalCartPrice)} USD
                    </span>
                  </div>
                  <Link
                    to={"/payment/" + productsCart?.data._id}
                    className="block text-center bg-main hover:bg-thrid hover:text-main text-white py-2 px-4 rounded-lg mt-4 w-full"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
            <div className=" text-center">
              <button
                onClick={clearCart}
                className="bg-red-600 hover:bg-red-500 focus:shadow-md focus:shadow-red-200 p-2 mt-5 rounded-md text-white "
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-4xl font-bold text-center">
          <h1>No Products in Cart</h1>
        </div>
      )}
    </>
  );
}
