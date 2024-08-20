import React from "react";
import Slider from "react-slick";

export default function ProductImagesSilder({ images, titleImage }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {images.length > 1 ? (
        <Slider {...settings}>
          {images?.map((img) => {
            return (
              <img
                className=" w-full   rounded-md object-contain  max-w-lg mx-auto"
                src={img}
                alt={titleImage}
              />
            );
          })}
        </Slider>
      ) : (
        <img
          className=" w-full   rounded-md object-contain  max-w-lg mx-auto"
          src={images}
          alt={titleImage}
        />
      )}
    </>
  );
}
