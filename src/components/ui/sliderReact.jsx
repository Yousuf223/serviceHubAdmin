"use client";
import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

// import required modules
import { Scrollbar } from "swiper/modules";
import Image from "next/image";
import {
  strick1,
  strick2,
  strick3,
  strick4,
  strick5,
  strick6,
  strick7,
} from "@/images";
import { Avatar, AvatarImage } from "./avatar";

export default function SliderReact({ image }) {
  //   const [data, setData] = useState([]);

  //   useEffect(() => {
  //     setData([
  //       { image: strick1, active: badges >= 10 },
  //       { image: strick2, active: badges >= 20 },
  //       { image: strick3, active: badges >= 30 },
  //       { image: strick4, active: badges >= 40 },
  //       { image: strick5, active: badges >= 50 },
  //       { image: strick6, active: badges >= 70 },
  //       { image: strick7, active: badges >= 100 },
  //     ]);
  //   }, [badges]);
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={5}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1440: {
            slidesPerView: 4,
            spaceBetween: 6,
          },
          1800: {
            slidesPerView: 4,
            spaceBetween: 6,
          },
        }}
        modules={[Scrollbar]}
        className="mySwiper"
      >
        {image?.map((item, index) => {
          console.log("sadhkfhsdhgfsdhgfgsdfhsd", item?.feedBackUrl);
          return (
            <SwiperSlide key={index}>
              <Avatar className={"w-24 h-24"}>
                <AvatarImage
                  src={item?.feedBackUrl ? item?.feedBackUrl : item?.horseUrl}
                />
              </Avatar>

              {/* <Image
                className={`sm:w-14 xl:w-20 md:w-16  sm:h-14  md:h-16 xl:h-20  `}
                width={1000}
                height={1000}
                src={item?.horseUrl}
                alt="horse"
              /> */}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
