import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import useAuth from "../hooks/useAuth.js";

const DashboardRoot = () => {
  const { userInfo } = useAuth();
  const [greetings, setGreetings] = useState(null);
  const [anmLearning, setAnmLearning] = useState(null);

  useEffect((_) => {
    import(`../assets/online-learning.json`).then((response) =>
      setAnmLearning(response.default)
    );
  }, []);

  useEffect((_) => {
    {
      const hours = new Date().getHours();

      if (hours < 12) setGreetings("Morning");
      else if (hours >= 12 && hours <= 18) setGreetings("Afternoon");
      else if (hours > 18 && hours <= 24) setGreetings("Evening");
    }
  }, []);

  return (
    <div className="max-w-sm mx-auto">
      {anmLearning ? (
        <Lottie className="w-full" animationData={anmLearning} loop={true} />
      ) : null}
      <h2 className="font-bold text-lg text-white text-center">
        Good {greetings}, {userInfo.displayName}
      </h2>
    </div>
  );
};

export default DashboardRoot;
