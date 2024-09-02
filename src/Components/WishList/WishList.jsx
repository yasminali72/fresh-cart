import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import CartProduct from "../CartProduct/CartProduct";
import WishListProduct from "../WishListProduct/WishListProduct";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

export default function WishList() {
  const [isLoading, setIsLoading] = useState(false);

  const [productsWishList, setProductsWishList] = useState([]);

  const [countProductinWishList, setCountProductinWishList] = useState(0);

  useEffect(() => {
    getWishList();
  }, [countProductinWishList]);

  async function getWishList() {
    setIsLoading(true);
    let { data } = await axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .catch(() => setIsLoading(false));
    setIsLoading(false);
    setProductsWishList(data.data);
    setCountProductinWishList(data.count);
    
  }
  
async function clearWishList(){
  productsWishList.forEach(product => {
    
     axios.delete(
      "https://ecommerce.routemisr.com/api/v1/wishlist/" + product.id,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    
  });
  setCountProductinWishList(0);
  toast.error('All products are deleted successfully ', {
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
      <div className="container w-full bg-gray-50 rounded-md p-16 dark:bg-Dark">
        <h1 className="text-4xl  mb-8">My Wish List</h1>
{ productsWishList.length===0 && <button className="bg-main p-2 rounded-md text-white text-xl hover:bg-sec hover:text-main mb-4"><Link to={'/Products'}><i className="fa-solid fa-arrow-left-long"></i> Back to Products</Link></button>
}
        <div className="grid grid-cols-1 ">
          {productsWishList?.map((product, index) => {
            return (
              <WishListProduct
                key={index}
                product={product}
                setCountProductinWishList={setCountProductinWishList}
              />
            );
          })}
        </div>
        <div className="flex justify-center items-center">
{      productsWishList.length>0 &&  <button className=" bg-red-600 p-2 rounded-md text-white text-xl hover:bg-red-400  mt-4" onClick={clearWishList}>Clear Wish List</button>
}</div>
      </div>

      {isLoading && <Loading />}
    </>
  );
}
