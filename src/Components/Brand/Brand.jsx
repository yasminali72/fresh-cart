import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";

export default function Brand({ brand }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setshowModal] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
        setshowModal(true);
      }, 500);
    }
  }, [isLoading]);

  function close() {
    setshowModal(false);
  }

  return (
    <div>
      <div
        onClick={() => {
          setIsLoading(true);
        }}
        id={brand._id}
        className="  space-y-6 my-5 px-5 border mx-5  hover:shadow-3xl hover:shadow-four rounded-lg p-5 "
        role="button"
      >
        <div className="w-full h-full flex flex-col text-center   ">
          <img src={brand.image} />
          <h1 className=" text-lg  ">{brand.name}</h1>
        </div>
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
                  {brand.name}
                </h1>
                <p>{brand.slug}</p>
              </div>
              <img src={brand.image} alt="" />
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
    </div>
  );
}
