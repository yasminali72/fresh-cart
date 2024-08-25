import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const isFirstRender = useRef(true);  // A ref to track the first render
  useEffect(() => {
    getAllCategories();
    getWishList().then(() => getProducts());
    isFirstRender.current=true
  }, []);
  useEffect(()=>{
    if(isFirstRender.current){
      isFirstRender.current=false
    }
    else{
    window.scrollTo({top:700,behavior:'smooth'})}
  },[currentPage])
  async function getProducts() {
    setIsLoading(true);
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );


    let arr = [];

    for (let index = 0; index < data.data.length; index++) {
      const element = data.data[index];

      if (element.ratingsAverage > 4) {
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
  // Calculate the products to display for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  // Determine the total number of pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Generate array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Handle page change when a page number is clicked
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  function paginate(diraction){
    
    if(diraction==='next' && currentPage <totalPages){
      setCurrentPage(currentPage+1)
        
    }
    else if(diraction==='prev' && currentPage <=totalPages){
      setCurrentPage(currentPage-1)
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
      <div className="flex flex-wrap lg:flex-nowrap w-full  mx-auto mb-10 xl:h-80 ">
  <div className="slider-container  w-full  xl:w-3/4 h-full overflow-hidden">
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
  <div className="hidden xl:block xl:w-1/4 h-full   z-10">
    <img src={img4} className="w-full h-1/2 object-cover rounded-tr-md  lg:mb-0 lg:rounded-tr-none" alt="" />
    <img src={img5} className="w-full h-1/2 object-cover rounded-br-md lg:rounded-br-none " alt="" />
  </div>
</div>

        <SliderCategory imagesCategory={imagesCategory} />

        <div class="max-w-2xl mx-auto mb-7 mt-7 px-2 sm:px-0">
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
        <div className="grid sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4  gap-5   justify-center items-center ">
          {currentProducts.map((product, index) => {
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
{/* Pagination Controls */}
{!isLoading && (pageNumbers.length>0? <div className="flex justify-center items-center mt-6 space-x-2">
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
</div>:<h1 className="text-center font-bold capitalize">not found this product</h1>)}
      {isLoading && <Loading />}
    </>
  );
}
