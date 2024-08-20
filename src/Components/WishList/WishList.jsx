import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import CartProduct from "../CartProduct/CartProduct";
import WishListProduct from "../WishListProduct/WishListProduct";
import Loading from "../Loading/Loading";

export default function WishList() {
  const [isLoading, setIsLoading] = useState(false);

  const [productsWishList, setProductsWishList] = useState(null);

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

  return (
    <>
      <div className="container w-full bg-gray-50 rounded-md p-16 dark:bg-Dark">
        <h1 className="text-4xl  mb-8">My Wish List</h1>

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
      </div>

      {isLoading && <Loading />}
    </>
  );
}
