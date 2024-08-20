import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Loading from "../Loading/Loading";
import Product from "../Product/Product";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [idProdWishList, setIdProdWishList] = useState(null);

  const [searchProducts, setSearchProduct] = useState([]);
  useEffect(() => {
    getWishList().then(() => getAllProducts());
  }, []);
  async function getAllProducts() {
    setIsLoading(true);
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    setProducts(data.data);
    setIsLoading(false);
    setSearchProduct(data.data);
  }

  async function getWishList() {
    let { data } = await axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .catch(() => setIsLoading(false));

    setIdProdWishList(data.data);
  }

  function search(value) {
    let filteredProducts = searchProducts.filter((product) =>
      product.title.toLowerCase().includes(value.toLowerCase())
    );
    setProducts(filteredProducts);

    if (value === "") {
      setProducts(searchProducts);
    }
  }

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <>
        <div>
          <div class="max-w-2xl mx-auto mb-7">
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
            >
              Search
            </label>
            <div class="relative">
              <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                onChange={(e) => search(e.currentTarget.value)}
                type="search"
                id="default-search"
                class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-main focus:border-main focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-main"
                placeholder="Search Product..."
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4  gap-5 justify-center items-center ">
            {products.map((product, index) => {
              return (
                <Product
                  key={index}
                  product={product}
                  idProdWishList={idProdWishList}
                />
              );
            })}
          </div>
        </div>

        {isLoading && <Loading />}
      </>
    </>
  );
}
