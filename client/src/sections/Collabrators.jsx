import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const slides = [
  { id: 1, imgLink: "collabrators/sondhani.jpg" },
  { id: 2, imgLink: "collabrators/bdrcs.png" },
  { id: 3, imgLink: "collabrators/badhan.jpg" },
  { id: 4, imgLink: "collabrators/quantummethod.png" },
];

const Collabrators = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const swiperRef = useRef(null);

  return (
    <div className="relative w-full section-padding pb-20">
      <h1 className="text-3xl font-black text-[#3C3C3C] mb-10 text-left">
        Our Collabrators
      </h1>
      <Swiper
        ref={swiperRef}
        grabCursor={true}
        mousewheel={true}
        // slidesPerView={3}
        spaceBetween={10}
        centeredSlides={true}
        loop={true}
        onSlideChange={(slides) => setActiveIndex(slides.realIndex)}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {slides.map((item, idx) => (
          <SwiperSlide
            key={idx}
            // style={{ height: "50vh" }}
            className="p-3"
          >
            <div
              className={`w-56 mx-auto aspect-square transition-all duration-300 bg-white border-2 border-slate-500 ${
                idx === activeIndex
                  ? "scale-110 shadow-xl"
                  : "scale-90 shadow-none "
              } grid place-items-center p-10 `}
            >
              <img src={item.imgLink} alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-center items-center py-8">
        <div className="flex gap-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`size-2.5 rounded-full ${
                idx === activeIndex
                  ? "bg-gray-700 border border-slate-700"
                  : "bg-slate-300"
              }`}
              onClick={() => {
                setActiveIndex(idx);
                swiperRef.current.swiper.slideToLoop(idx);
              }}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collabrators;
