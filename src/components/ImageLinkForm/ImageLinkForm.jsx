import React from "react";

const ImageLinkForm = ({ onInputChange, onBtnSubmit }) => {
  return (
    <div className="">
      <p className="text-lg m-4 flex justify-center items-center">
        {"This Magic Brain will detect faces in your pictures. Try it!"}
      </p>
      <div className="flex flex-row justify-center items-center">
        <div className="w-[30%] p-4 rounded-lg shadow-xl">
          <input
            type="text"
            className="w-3/5 text-md p-2"
            onChange={onInputChange}
          />
          <button
            className="w-2/5 hover:scale-105 transition-transform text-xl no-underline cursor-pointer py-2 inline-block text-white bg-purple-700 my-2"
            onClick={onBtnSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
