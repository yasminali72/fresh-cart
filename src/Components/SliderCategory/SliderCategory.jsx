import React from "react";
import Slider from "react-slick";

export default function SliderCategory({ imagesCategory }) {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container mx-auto overflow-hidden ">
      <Slider {...settings}>
        {imagesCategory?.map((image, index) => {
          return (
            <div className="mb-3 " key={index}>
              <img
                src={image.image}
                alt=""
                className="w-full h-96  object-cover border-0 "
              />
              <h1 className="text-center md:text-3xl font-semibold">
                {image.name}
              </h1>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
