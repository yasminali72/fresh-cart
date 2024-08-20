import React, { useState } from "react";
import { addProductsToCart } from "../../cartService";
import axios from "axios";
import Loading from "../Loading/Loading";
import { Bounce, toast } from "react-toastify";
export default function WishListProduct({
  product,
  setCountProductinWishList,
}) {

  async function removeProductFromWishList(productId) {
    let { data } = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/wishlist/" + productId,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setCountProductinWishList(data.data.length);
    toast.error(data.message, {
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

  return (
    <>
      <div className="flex w-full justify-between items-center py-3 ">
        <div className="flex justify-start items-center w-1/2 ">
          <img
            src={product.imageCover}
            className="w-1/3 h-fit  rounded me-6 "
            alt=""
          />
          <div className=" ">
            <h1 className="">{product.title}</h1>
            {product.priceAfterDiscount ? (
              <div className="flex">
                <h1 className="text-green-600 font-bold text-xl">
                  <span className="text-gray-400 line-through">
                    ${product.price}
                  </span>{" "}
                  ${product.priceAfterDiscount}
                </h1>
              </div>
            ) : (
              <h1 className="text-green-600 font-bold text-xl">
                ${product.price}
              </h1>
            )}
            <p
              onClick={() => removeProductFromWishList(product.id)}
              className="text-red-500 "
              role="button"
            >
              <i className="fa-solid fa-trash me-1"></i>
              <span>Remove</span>
            </p>
          </div>
        </div>
        <button
          onClick={() => addProductsToCart(product.id)}
          className="p-2 rounded border-main border-2 hover:text-white hover:bg-main dark:bg-main dark:hover:bg-white dark:hover:text-main"
        >
          Add to Cart
        </button>
      </div>
      <hr />

    </>
  );
}
