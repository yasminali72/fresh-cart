import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Product from "../Product/Product";
import Loading from "../Loading/Loading";
import { useCallback } from "react";

export default function SpecificProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
const navigate=useNavigate()

  const { id } = useParams();

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    setIsLoading(true);
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    setProducts(data.data.filter((product) => product.brand._id == id || product.category._id == id));
    console.log(data.data);
    setIsLoading(false);
  }
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : products.length === 0 ? (
<div className="flex flex-col   items-center">
<h1 className=" fs-1 fw-bold">Not Found Products</h1>
<button onClick={()=>navigate(-1)} className="bg-main text-white px-2 py-1 rounded-md text-bold mt-2 hover:text-main hover:bg-white border border-main ">back to home</button>
</div>       
      ) : (
        <div>
          <button onClick={()=>navigate(-1)} className="bg-main text-white px-2 py-1 rounded-md text-bold mb-4 hover:text-main hover:bg-white border border-main ms-6">back to home</button>

          <div className="grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 gap-5 justify-center items-center">
          {products?.map((product, index) => (
            <Product key={index} product={product} />
          ))}
        </div>
        </div>
      )}
    </>
  );
}
