import React from "react";

const Rank = ({ name, entries }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-lg text-white">
        {name ? `${name}, your current entry count is...` : "Loading..."}
      </div>
      <div className="text-white text-2xl">{entries || 0}</div>
    </div>
  );
};

export default Rank;
