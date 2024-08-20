import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Product from "../Product/Product";
import Loading from "../Loading/Loading";
import WishList from "../WishList/WishList";
import img1 from "/src/assets/images/grocery-banner.png";
import img2 from "/src/assets/images/grocery-banner-2.jpeg";
import img3 from "/src/assets/images/slider-2.jpeg";
import img4 from "/src/assets/images/slider-image-3.jpeg";
import img5 from "/src/assets/images/slider-image-2.jpeg";
import SliderCategory from "../SliderCategory/SliderCategory";
import Slider from "react-slick";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [idProdWishList, setIdProdWishList] = useState(null);
  const [searchProducts, setSearchProduct] = useState([]);
  const [imagesCategory, setImagesCategory] = useState([]);

  useEffect(() => {
    getAllCategories();
    getWishList().then(() => getProducts());
  }, []);

  async function getProducts() {
    setIsLoading(true);
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );

    // setSearchProduct(data.data)

    let arr = [];

    for (let index = 0; index < 20; index++) {
      const element = data.data[index];

      if (element.ratingsAverage > 4.5) {
        arr.push(element);
      }
    }
    setProducts(arr);
    setSearchProduct(arr);
    setIsLoading(false);
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

  async function getAllCategories() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    setImagesCategory(data.data);
  }

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 5000,
    cssEase: "linear",
  };

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div>
      <div className="flex flex-wrap lg:flex-nowrap w-full  mx-auto mb-10 lg:h-96">
  <div className="slider-container  w-full sm:w-2/3 lg:w-3/4 h-full overflow-hidden">
    <Slider {...settings}>
      <div className="h-full">
        <img src={img3} alt="" className="h-full w-full object-cover rounded-l-md" />
      </div>
      <div className="h-full">
        <img src={img2} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="h-full">
        <img src={img1} alt="" className="h-full w-full object-cover rounded-l-md" />
      </div>
    </Slider>
  </div>
  <div className=" w-full sm:w-1/3 lg:w-1/4 h-full lg:pb-5   z-10">
    <img src={img4} className="w-full h-1/2 object-cover rounded-tr-md  lg:mb-0 lg:rounded-tr-none" alt="" />
    <img src={img5} className="w-full h-1/2 object-cover rounded-br-md lg:rounded-br-none " alt="" />
  </div>
</div>

        <SliderCategory imagesCategory={imagesCategory} />

        <div class="max-w-2xl mx-auto mb-7 mt-7">
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
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5   justify-center items-center ">
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
  );
}
