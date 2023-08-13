import React from "react";
import { GiBrain, GiNotebook, GiSkills } from "react-icons/gi";
import imgUnderline from "../../assets/underline.png";

const WhyChooseThinkLock = () => {
  return (
    <section className="py-16 text-white">
      <div className="container">
        <div className="mb-16">
          <div className="relative w-fit mx-auto">
            <h3 className="font-bold text-2xl">Why Choose ThinkLock</h3>
            <img
              src={imgUnderline}
              alt=""
              className="absolute left-[38%] -bottom-2 -translate-x-1/2 w-24"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 max-w-4xl mx-auto">
          <div className={`bg-blue-maastricht rounded-lg p-6 space-y-3`}>
            <div className={`text-3xl !mb-5`}>
              <GiSkills />
            </div>
            <h2 className={`font-bold text-lg`}>Enhance Personal Skill</h2>
            <p>
              Equip learners with a wide range of knowledge for education
              purpose.
            </p>
          </div>
          <div className={`bg-blue-maastricht rounded-lg p-6 space-y-3`}>
            <div className={`text-3xl !mb-5`}>
              <GiBrain />
            </div>
            <h2 className={`font-bold text-lg`}>Sufficient Knowledge</h2>
            <p>
              Study keeps your brain growing because everyone know that we
              cannot reach the top of knowledge.
            </p>
          </div>
          <div className={`bg-blue-maastricht rounded-lg p-6 space-y-3`}>
            <div className={`text-3xl !mb-5`}>
              <GiNotebook />
            </div>
            <h2 className={`font-bold text-lg`}>Self Learning</h2>
            <p>
              You can learn anytime from anywhere, so, you control your study
              with all our tools & courses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseThinkLock;
