import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  return (
    <div className={`flex bg-white p-1 rounded-lg`}>
      <input
        placeholder="Email address"
        type="email"
        value={email}
        className="input input-sm bg-transparent text-pink-600 rounded-none w-full focus:outline-0"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className={`btn btn-sm bg-pink-600 hover:bg-green-dark-jungle text-white text-xs border-transparent rounded-lg normal-case`}
      >
        Subscribe
      </button>
    </div>
  );
};

export default Newsletter;
