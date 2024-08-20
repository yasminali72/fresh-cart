import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Category from "../Category/Category";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
export default function () {
  const [categories, setCategories] = useState([]);


   function getAllCategories() {
   
   return axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    )
  }
let {data,isLoading}=useQuery({
  queryKey:['categories'],
  queryFn:getAllCategories,
  // gcTime:15000,
  select:(data)=>data.data.data
})
console.log(data);

  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>

      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="container   grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3   mt-5">
            {data?.map((category, index) => {
              return <Category key={index} category={category} />;
            })}
          </div>
        )}
      </div>
    </>
  );
}
