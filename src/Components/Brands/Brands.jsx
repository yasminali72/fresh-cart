import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Brand from "../Brand/Brand";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
export default function Brands() {
  const [brands, setBrands] = useState([]);

 function getAllBrands() {
   return axios.get(
      "https://ecommerce.routemisr.com/api/v1/brands"
    );

  }
let{data,isLoading}=useQuery({
  queryKey:['brands'],
  queryFn:getAllBrands,
  // gcTime:15000,
  select:(data)=>data.data.data
})
  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      <div>
        <div className=" text-center   ">
          <h1 className="font-bold text-main text-4xl">All Brands</h1>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <div className="container   grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 mt-5">
            {data?.map((brand, index) => {
              return <Brand key={index} brand={brand} />;
            })}
          </div>
        )}
      </div>
    </>
  );
}
