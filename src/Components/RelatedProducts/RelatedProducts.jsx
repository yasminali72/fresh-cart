import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import Slider from "react-slick";
import { bool } from "yup";
import ProductDetails from "../ProductDetails/ProductDetails";
import { addProductsToCart } from "../../cartService";
import { formatNumber } from "../../currency";
export default function RelatedProducts({ relatedProducts }) {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    
    speed: 200,
   
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      
    ],
  };
  return (
    <>
      <div className="mt-16">
        <h3 className="text-gray-600 text-2xl font-medium mb-2 dark:text-gray-400">
          More Products
        </h3>
        <Slider {...settings}>
          {relatedProducts?.map((product, index) => {
            return (
              <div
                className="w-full max-w-sm mx-auto rounded-md  overflow-hidden  p-2  "
                key={index}
              >
                <div className=" shadow-md ">
                  <div
                    className="flex  items-end justify-end h-56 w-full bg-contain bg-no-repeat bg-center  "
                    style={{ "background-image": `url(${product.imageCover})` }}
                  >
                    <button
                      className="p-2 rounded-full bg-main text-white mx-5 -mb-4 hover:bg-sec hover:text-main focus:outline-none "
                      onClick={() => addProductsToCart(product.id)}
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                    </button>
                  </div>

                  <div className="px-5 py-3">
                    <Link to={"/productDetails/" + product.id}>
                      {" "}
                      <h3 className="text-gray-700 line-clamp-1 hover:text-main dark:text-gray-400 dark:hover:text-main mb-1">
                        {product.title}
                      </h3>
                    </Link>
                    <span className="text-black mt-2 dark:text-gray-400 "><sup className="font-normal text-base ">EGP</sup>{formatNumber(product.price)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
}

