import React from "react";

const Card = ({ children }) => {
  return (
    <div className="bg-zinc-900 text-white rounded-2xl p-4 shadow-lg hover:scale-105 transition duration-300">
      {children}
    </div>
  );
};

export default Card;
