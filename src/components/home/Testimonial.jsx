import React from "react";
import imgUnderline from "../../assets/underline.png";
import imgT1 from "../../assets/testimonial/img-t1.jpg";
import imgT2 from "../../assets/testimonial/img-t2.jpg";
import imgT3 from "../../assets/testimonial/img-t3.png";

const Testimonial = () => {
  return (
    <section className="py-16 text-white overflow-y-hidden">
      <div className="container">
        <div className="mb-16" data-aos="fade-up">
          <div className="relative w-fit mx-auto">
            <h3 className="font-bold text-2xl">What Our Student Say</h3>
            <img
              src={imgUnderline}
              alt=""
              className="absolute left-[38%] -bottom-2 -translate-x-1/2 w-24"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 max-w-4xl mx-auto">
          <div
            className="bg-blue-maastricht rounded-lg"
            data-aos="fade-up"
            data-aos-offset="-60"
          >
            <div className="relative">
              <img src={imgT1} className="w-full rounded-t-lg" alt="" />
              <svg
                className="absolute left-0 -bottom-1 text-blue-maastricht"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
              >
                <path
                  fill="currentColor"
                  d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
              </svg>
            </div>
            <div className="p-6">
              <h5 className="font-bold text-lg mb-2">Tajul G.</h5>
              <h6 className="font-medium text-pink-600 mb-4">
                Marketing Specialist
              </h6>
              <p>
                Excellent Course. Being a beginner myself, I find the context
                and word by word translation to be clear, to the point and easy
                to comprehend. This Practical Wisdom allow me to understand the
                surah better as I recite these surah in prayer.
              </p>
            </div>
          </div>
          <div
            className="bg-blue-maastricht rounded-lg"
            data-aos="fade-up"
            data-aos-offset="-60"
          >
            <div className="relative">
              <img src={imgT2} className="w-full rounded-t-lg" alt="" />
              <svg
                className="absolute left-0 -bottom-1 text-blue-maastricht"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
              >
                <path
                  fill="currentColor"
                  d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
              </svg>
            </div>
            <div className="p-6">
              <h5 className="font-bold text-lg mb-2">Rah. K.</h5>
              <h6 className="font-medium text-pink-600 mb-4">Jr. Developer</h6>
              <p>
                I have nothing but good things to say about my experience with
                ThinkLock. I have loved the learning I have been able to do and
                look forward to taking many more classes with them.
              </p>
            </div>
          </div>
          <div
            className="bg-blue-maastricht rounded-lg"
            data-aos="fade-up"
            data-aos-offset="-60"
          >
            <div className="relative">
              <img src={imgT3} className="w-full rounded-t-lg" alt="" />
              <svg
                className="absolute left-0 -bottom-1 text-blue-maastricht"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
              >
                <path
                  fill="currentColor"
                  d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
              </svg>
            </div>
            <div className="p-6">
              <h5 className="font-bold text-lg mb-2">Arsalan</h5>
              <h6 className="font-medium text-pink-600 mb-4">Businessman</h6>
              <p>
                I bought a course and I really love it. The video interface is
                awesome. The platform is user-friendly and easy to navigate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
