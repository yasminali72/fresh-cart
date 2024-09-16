import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Brand from "../Brand/Brand";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
export default function Brands() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

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
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentBarnds = data?.slice(indexOfFirstItem, indexOfLastItem);

const totalPages = Math.ceil(data?.length / itemsPerPage);

const pageNumbers = [];
for (let i = 1; i <= totalPages; i++) {
  pageNumbers.push(i);
}

const handlePageClick = (pageNumber) => {
  setCurrentPage(pageNumber);
};
useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, [currentPage]);
function paginate(diraction){
  
  if(diraction==='next' && currentPage <totalPages){
    setCurrentPage(currentPage+1)
      
  }
  else if(diraction==='prev' && currentPage <=totalPages){
    setCurrentPage(currentPage-1)
    }
}
  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      <div className="h-[100vh]">
        <div className=" text-center   ">
          <h1 className="font-bold text-main text-4xl">All Brands</h1>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <div className="container   grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 mt-5">
            {currentBarnds?.map((brand, index) => {
              return <Brand key={index} brand={brand} />;
            })}
          </div>

          
        )}
        {!isLoading && (pageNumbers.length>0&& <div className="flex justify-center items-center mt-6 space-x-2">
  <button
    onClick={() => paginate("prev")}
    disabled={currentPage === 1}
    className={`px-4 py-2 bg-main text-white rounded-lg transition-opacity duration-300 hover:bg-sec hover:text-main
      ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-main-dark"} 
       disabled:opacity-50 disabled:cursor-not-allowed`}
  >
    Previous
  </button>

  <div className="flex space-x-1">
    {pageNumbers.map((number) => (
      <button
        key={number}
        onClick={() => handlePageClick(number)}
        className={`px-4 py-2 rounded-lg transition-colors duration-300 
          ${currentPage === number ? "bg-main text-white" : "bg-gray-200 text-gray-900 "} 
          `}
      >
        {number}
      </button>
    ))}
  </div>

  <button
    onClick={() => paginate("next")}
    disabled={currentPage === totalPages}
    className={`px-4 py-2 bg-main text-white rounded-lg transition-opacity duration-300 hover:bg-sec hover:text-main
      ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-main-dark"} 
        disabled:opacity-50 disabled:cursor-not-allowed`}
  >
    Next
  </button>
</div>)}
      </div>
    </>
  );
}
