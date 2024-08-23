import { data } from "autoprefixer";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { formatNumber } from "../../currency";
import OrderProgress from "../OrderProgress/OrderProgress";
import Loading from "../Loading/Loading";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";

export default function Orders() {
  const { id } = jwtDecode(localStorage.getItem("token"));

  function date(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }


   function getUserOrders() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/` + id)
      
  }
 let{data,isLoading}= useQuery({
    queryKey:['orders'],
    queryFn:getUserOrders,
    select:(data)=>(data.data)
    
  })
 
  return (
    <>
    <Helmet>
      <title>All Orders</title>
    </Helmet>
      {data?.map((order, index) => {
        return (
          <div key={index} className="my-5">
            <div class="flex justify-start item-start space-y-2 flex-col">
              <h1 class="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                Order #{order.id}
              </h1>
              <p class="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
                {date(order.updatedAt)}
              </p>
            </div>
            <div class="mt-10 flex flex-col  jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
              <div class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                <div class="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                  <p class="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                    Customer’s Cart
                  </p>

                  {order.cartItems.map((item, index) => (
                    <div
                      key={index}
                      class="border-b border-gray-200 mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
                    >
                      <div class="pb-4 md:pb-8 w-full md:w-40">
                        <img
                          class="w-1/3 h-1/3 md:w-full   md:block"
                          src={item.product.imageCover}
                          alt={item.product.title}
                        />
                      </div>
                      <div class=" md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                        <div class="w-full flex flex-col justify-start items-start space-y-8">
                         
                          <div class="flex justify-start items-start flex-col space-y-2">
                            <p class="text-sm dark:text-white leading-none text-gray-800">
                              <span class="dark:text-gray-400 text-gray-300">
                                Style:
                              </span>
                              {item.product.title}
                            </p>
                            <p class="text-sm dark:text-white leading-none text-gray-800">
                              <span class="dark:text-gray-400 text-gray-300">
                                Brand:
                              </span>
                              {item.product.brand.name}
                            </p>
                          </div>
                        </div>
                        <div class="flex justify-between space-x-8 items-start w-full">
                          <p class="text-base dark:text-white xl:text-lg leading-6">
                            ${item.price}
                          </p>
                          {item.count < 10 ? (
                            <p class="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                              0{item.count}
                            </p>
                          ) : (
                            <p class="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                              {item.count}
                            </p>
                          )}
                          <p class="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                            ${item.price * item.count}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div class="flex justify-center flex-col md:flex-row  items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                  <div class="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                    <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                      Summary
                    </h3>
                    <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                      <div class="flex justify-between w-full">
                        <p class="text-base dark:text-white leading-4 text-gray-800">
                          Subtotal
                        </p>
                        <p class="text-base dark:text-gray-300 leading-4 text-gray-600">
                          ${order.totalOrderPrice}
                        </p>
                      </div>
                      <div class="flex justify-between items-center w-full">
                        <p class="text-base dark:text-white leading-4 text-gray-800">
                          tax
                        </p>
                        <p class="text-base dark:text-gray-300 leading-4 text-gray-600">
                          ${order.taxPrice}
                        </p>
                      </div>
                      <div class="flex justify-between items-center w-full">
                        <p class="text-base dark:text-white leading-4 text-gray-800">
                          Shipping
                        </p>
                        <p class="text-base dark:text-gray-300 leading-4 text-gray-600">
                          ${order.shippingPrice}
                        </p>
                      </div>
                    </div>
                    <div class="flex justify-between items-center w-full">
                      <p class="text-base dark:text-white font-semibold leading-4 text-gray-800">
                        Total
                      </p>
                      <p class="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                        ${formatNumber(order.totalOrderPrice)}
                      </p>
                    </div>
                  </div>
                  <div class="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                    <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                      Details
                    </h3>
                    <div class="flex flex-col justify-start  w-full">
                      <p class="text-lg leading-6 dark:text-white font-semibold text-gray-800">
                        Name:
                        <span class="font-normal capitalize">
                          {order.user.name}
                        </span>
                      </p>
                      <p class="text-lg leading-6 dark:text-white font-semibold text-gray-800">
                        Email:
                        <span class="font-normal">{order.user.email}</span>
                      </p>
                      <p class="text-lg leading-6 dark:text-white font-semibold text-gray-800">
                        Phone:
                        <span class="font-normal">
                          {order.shippingAddress.phone}
                        </span>
                      </p>

                      <p class="text-lg leading-6 dark:text-white font-semibold text-gray-800">
                        City:
                        <span class="font-normal capitalize">
                          {order.shippingAddress.city}
                        </span>
                      </p>
                      <p class="text-lg leading-6 dark:text-white font-semibold text-gray-800">
                        Address Details:
                        <span class="font-normal capitalize">
                          {order.shippingAddress.details}
                        </span>
                      </p>
                    </div>
                    <OrderProgress order={order} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {isLoading && <Loading />}
    </>
  );
}
