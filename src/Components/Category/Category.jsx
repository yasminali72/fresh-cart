import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";

export default function Category({ category }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [isLoading]);

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
        <h1 className=" text-2xl font-bold text-main py-5 w-full text-center ">
          {category.name}
        </h1>
      </div>

      {isLoading && <Loading />}
    </>
  );
}
