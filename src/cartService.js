import { Bounce, toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
export async function addProductsToCart(productId) {
  let { data } = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/cart",
    {
      productId: productId,
    },
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );
  console.log(data);
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
