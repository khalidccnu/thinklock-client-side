import React from "react";
import imgAppDownload from "../../assets/app-download.png";
import imgPlayStore from "../../assets/play-store.png";
import imgAppStore from "../../assets/app-store.png";

const AppDownload = () => {
  return (
    <section className={`bg-blue-maastricht py-16 overflow-x-hidden`}>
      <div className="container">
        <div
          className={`flex flex-col sm:flex-row space-y-5 sm:space-y-0 items-center justify-between max-w-4xl mx-auto`}
        >
          <figure data-aos="fade-right" data-aos-delay="120">
            <img src={imgAppDownload} alt="" className={`w-full max-w-xs`} />
          </figure>
          <div
            className={`text-white space-y-3`}
            data-aos="fade-left"
            data-aos-delay="120"
          >
            <div>
              <h2 className="font-bold text-2xl">
                Learn on your mobile anytime!
              </h2>
              <p>You can browse, study, and make purchases with our apps.</p>
            </div>
            <div className={`flex space-x-3`}>
              <figure className={`max-w-[10rem] cursor-pointer`}>
                <img src={imgPlayStore} alt="" />
              </figure>
              <figure className={`max-w-[10rem] cursor-pointer`}>
                <img src={imgAppStore} alt="" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
