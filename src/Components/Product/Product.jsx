import React, { useContext, useEffect, useState } from "react";
import RatingStar from "../RatingStar/RatingStar";
import { Link } from "react-router-dom";
import { addProductsToCart } from "../../cartService";
import {
  addProductsToWishList,
  removeProductFromWishList,
} from "../../wishListServices";
import { Bounce, toast } from "react-toastify";
import { AuthContext } from "../../Contexts/AuthContext";

export default function Product({ product, idProdWishList }) {
  const { userToken } = useContext(AuthContext);
  // if dont login
  const [alert, setAlert] = useState("");

  const isProductInWishlist = idProdWishList?.some(
    (prod) => prod._id === product._id
  );

  // Heart icon state
  const [isActive, setIsActive] = useState(isProductInWishlist);

  const handleClick = async (productId) => {
    if (userToken) {
      setIsActive((prev) => !prev); // Toggle the active state

      if (!isActive) {
        await addProductsToWishList(productId);
      } else {
        await removeProductFromWishList(productId);
      }
    } else {
      toast.error("Please Login First", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <div className="productCard max-w-lg  h-full overflow-y-hidden p-2  ">
        <div className="bg-white hover:shadow-3xl hover:shadow-main rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700 h-full">
          <Link to={"/productDetails/" + product._id}>
            <img
              className="rounded-t-lg  w-full h-52 object-contain "
              src={product.imageCover}
              alt="product image"
            />
          </Link>
          <div className="px-3 py-1 pb-5">
            <div className=" flex justify-between items-center">
              <Link to={"/productDetails/" + product._id}>
                <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white line-clamp-1">
                  {product.title}
                </h3>
              </Link>
              <i
                className={`fa-solid fa-heart text-3xl  ${
                  isActive ? "text-main" : "text-gray-400"
                }`}
                onClick={() => {
                  handleClick(product._id);
                  if (!userToken) {
                    setAlert("please login first");
                  }
                }}
                role="button"
              ></i>
            </div>
            <p className="line-clamp-1">{product.description}</p>

            <RatingStar rating={product.ratingsAverage} />

            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              <sup className="font-medium text-base text-black dark:text-white">
                EGP
              </sup>
              {product.price}
            </span>

            <button
              onClick={() => {
                addProductsToCart(product.id, userToken);
                if (!userToken) {
                  setAlert("please login first");
                }
              }}
              className="add w-full mt-2 text-white bg-main hover:bg-sec hover:text-main focus:ring-4 focus:ring-thrid font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-main dark:hover:bg-sec dark:focus:ring-thrid"
            >
              <i className="fa-solid fa-cart-shopping me-1 "></i> Add to cart
            </button>
          </div>
        </div>
      </div>
      {alert && (
        <div className="fixed top-20 start-2 w-72 p-3 bg-sec text-main rounded capitalize ">
          {alert} ,{" "}
          <Link to={"/login"} className="underline">
            login here
          </Link>
          <i
            className="fa-solid fa-xmark absolute end-1 top-1 cursor-pointer"
            onClick={() => {
              setAlert("");
            }}
          ></i>
        </div>
      )}
    </>
  );
}
