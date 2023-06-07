import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";

const HomeSlider = () => {
  const navigate = useNavigate();

  return (
    <section>
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={true}
        autoplay={{
          delay: 5000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        slidesPerView="1"
        spaceBetween="50"
      >
        <SwiperSlide>
          <div className="relative flex items-center bg-[url('https://ik.imagekit.io/khalidccnu/tr:q-50/thinklock/homeslider/hs-01.jpg')] bg-no-repeat bg-center bg-cover min-h-[30rem] mt-14 text-center">
            <div className="absolute top-0 left-0 h-full w-full bg-black/80"></div>
            <div className="container">
              <div className="relative max-w-xl mx-auto space-y-3">
                <h1 className="text-red-600 font-bold text-2xl sm:text-3xl md:text-4xl">
                  Let the journey of Islamic enlightenment begin today!
                </h1>
                <button
                  className="btn btn-xs sm:btn-sm min-w-[8rem]"
                  onClick={(_) => navigate("/signup")}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative flex items-center bg-[url('https://ik.imagekit.io/khalidccnu/tr:q-50/thinklock/homeslider/hs-02.jpg')] bg-no-repeat bg-bottom bg-cover min-h-[30rem] mt-14 text-center">
            <div className="absolute top-0 left-0 h-full w-full bg-black/80"></div>
            <div className="container">
              <div className="relative max-w-xl mx-auto space-y-3">
                <h1 className="text-red-600 font-bold text-2xl sm:text-3xl md:text-4xl">
                  Did You Know?
                </h1>
                <p className="text-white text-xl">
                  Allah understands our prayers even when we can't find the
                  words to say them.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default HomeSlider;
