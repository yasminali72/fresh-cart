import { Bounce, toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
export async function addProductsToWishList(productId) {
  let { data } = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
      productId: productId,
    },
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );

  toast.success(data.message, {
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

export async function removeProductFromWishList(productId) {
  let { data } = await axios.delete(
    "https://ecommerce.routemisr.com/api/v1/wishlist/" + productId,
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );

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
