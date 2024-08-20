import { data } from "autoprefixer";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RatingStar from "../RatingStar/RatingStar";
import Loading from "../Loading/Loading";
import ProductImagesSilder from "../ProductImagesSilder/ProductImagesSilder";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import { addProductsToCart } from "../../cartService";
import {
  addProductsToWishList,
  removeProductFromWishList,
} from "../../wishListServices";

export default function ProductDetails() {
  let { id } = useParams();
  const [productDetails, setProductDetail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    getProductDetail();
  }, [id]);

  async function getProductDetail() {
    setIsLoading(true);
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products/" + id
    );
    setProductDetail(data.data);
    getRelatedProduct(data.data.category._id);
    setIsLoading(false);
  }

  async function getRelatedProduct(categoryId) {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products/",
      {
        params: {
          category: categoryId,
        },
      }
    );
    setRelatedProducts(data.data);
  }

  const [isActive, setIsActive] = useState(false);
  const handleClick = async (productId) => {
    setIsActive((prev) => !prev); // Toggle the active state

    if (!isActive) {
      await addProductsToWishList(productId);
    } else {
      await removeProductFromWishList(productId);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <main className="my-8">
          <div className="container mx-auto px-6">
            <div className="md:flex md:items-center">
              <div className="w-full  md:w-3/12  flex flex-col justify-center text-center  rounded-md ">
                <ProductImagesSilder
                  images={productDetails?.images}
                  titleImage={productDetails?.title}
                />
              </div>
              <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-9/12">
                <h1 className="mt-6 font-bold text-xl">
                  {productDetails?.title}
                </h1>
                <span className="text-gray-500 mt-3">
                  ${productDetails?.price}
                </span>
                <hr className="my-3" />

                <div className="mt-3">
                  <label className="text-gray-700 text-sm dark:text-gray-400" for="count">
                    Rating:
                  </label>
                  <RatingStar rating={productDetails?.ratingsAverage ?? 0} />
                </div>
                <div className="mt-3">
                  <label className="text-gray-700 text-sm dark:text-gray-400" for="count">
                    Description:
                  </label>
                  <h1>{productDetails?.description}</h1>
                </div>
                <div className="mt-3">
                  <label className="text-gray-700 text-sm dark:text-gray-400" for="count">
                    Category:
                  </label>
                  <h1>{productDetails?.category.name}</h1>
                </div>
                <div className="mt-3">
                  <label className="text-gray-700 text-sm dark:text-gray-400" for="count">
                    subcategory:
                  </label>
                  <h1>{productDetails?.subcategory[0].name}</h1>
                </div>
                <div className="mt-3">
                  <label className="text-gray-700 text-sm dark:text-gray-400" for="count">
                    Brand:
                  </label>
                  <h1>{productDetails?.brand.name}</h1>
                </div>
                <div className="mt-3">
                  <label className="text-gray-700 text-sm dark:text-gray-400" for="count">
                    Quantity:
                  </label>
                  <h1>{productDetails?.quantity}</h1>
                </div>
                <div className="flex items-center mt-6">
                  <button
                    onClick={() => addProductsToCart(productDetails.id)}
                    className="px-8 py-2 bg-main hover:bg-sec hover:text-main text-white text-sm font-medium rounded "
                  >
                    Order Now
                  </button>
                  <i
                    className={`fa-solid fa-heart text-2xl ms-3 border border-gray-300 rounded-md p-1 ${
                      isActive ? "text-main" : "text-gray-400"
                    }`}
                    onClick={() => handleClick(productDetails.id)}
                    role="button"
                  ></i>
                </div>
              </div>
            </div>
            <RelatedProducts relatedProducts={relatedProducts} />
          </div>
        </main>
      )}
    </>
  );
}
