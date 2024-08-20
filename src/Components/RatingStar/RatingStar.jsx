import React from "react";

export default function RatingStar({ rating }) {
  const halfStar = rating % 1 !== 0;
  const fullStars = Math.floor(rating); //return as 2.8=>2
  const emptyStars = 5 - Math.ceil(rating); // This accounts for both full and half stars // return as 2.8=>3
  const halfed = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-four hover:text-main "
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
    </svg>
  );

  const filled = (
    <svg
      className="w-5 h-5 text-four hover:text-main "
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
    </svg>
  );

  const gray = (
    <svg
      className="w-5 h-5 text-gray-300"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
    </svg>
  );

  return (
    <>
      <div className="flex  mt-2 mb-2 items-center justify-start ">
        <div className="flex justify-center  ">
          {[...Array(fullStars)].map(() => (
            <>{filled}</>
          ))}
          {halfStar && halfed}
          {[...Array(emptyStars)].map(() => (
            <>{gray}</>
          ))}
        </div>

        <span className="bg-sec text-main text-xs font-semibold mr-2 px-2.5 py-0.5 rounded  ml-3">
          {rating}
        </span>
      </div>
    </>
  );
}
