import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";

export default function Category({ category }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setshowModal] = useState(false);


  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false)
      setshowModal(true)}, 500)
    }
  }, [isLoading]);
  function close() {
    setshowModal(false);
  }
  return (
    <>
      <div
        onClick={() => setIsLoading(true)}
        id={category._id}
        className="flex flex-col    my-3  border mx-3  hover:shadow-3xl  hover:shadow-four rounded-lg hover:transition-all "
        role="button"
      >
        <div className="w-full h-80 ">
          <img className="w-full h-full rounded-t-lg" src={category.image} />
        </div>
        <Link to={`/specificProducts/${category._id}`} className=" text-2xl font-bold text-black py-5 w-full text-center border-t-2 border-gray hover:text-main dark:text-white dark:hover:text-main ">
          {category.name}
        </Link>
      </div>
      {showModal && (
        <div
          className="fixed  inset-0 bg-black bg-opacity-25 flex justify-center  z-[999] "
          onClick={close}
        >
          <div
            className="relative flex flex-col  bg-white lg:w-1/3 h-fit rounded-md mt-5 "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="close   flex justify-end p-2">
              <i
                onClick={close}
                role="button"
                className="fa-solid fa-xmark  text-3xl dark:text-black"
              ></i>
            </div>
            <hr />

            <div className="flex justify-between items-center p-5">
              <div>
                <h1 className="text-3xl text-main font-bold mb-2">
                  {category.name}
                </h1>
                <p>{category.slug}</p>
                <Link to={`/specificProducts/${category._id}`} className="text-main underline  capitalize">show products</Link>
              </div>
              <img src={category.image} alt="" className="w-32 h-32"/>
            </div>

            <hr />
            <div className="flex justify-end p-2">
              <button
                onClick={close}
                className="p-2 bg-gray-500 text-white rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {isLoading && <Loading />}
    </>
  );
}
