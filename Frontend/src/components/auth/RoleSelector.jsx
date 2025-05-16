import React from "react";

const RoleSelector = ({ icon, tittle, description, buttonText, onSelect }) => {
  return (
    <>
      <div className="text-center p-5">
        <div className="w-20 h-20 mx-auto mb-5 flex items-center justify-center rounded-full bg-black/5">
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-[#2c2417]">{tittle}</h2>
        <p className="italic mb-8 text-gray-600">{description}</p>
        <button
          className="bg-transparent border-2 border-[#2c2417] text-[#2c2417] py-2.5 px-6 text-base rounded-full cursor-pointer transition-all duration-300 hover:bg-[#2c2417] hover:text-white"
          onClick={onSelect}
        >
          {buttonText}
        </button>
      </div>
    </>
  );
};

export default RoleSelector;
