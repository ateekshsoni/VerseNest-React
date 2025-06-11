import React from "react";
import "../index.css";
import "./Main.css";
import Book from "../components/layout/Book";

const StartJourney = () => {
  return (
    <>
      <div className="relative min-h-screen bg-[#f5f1e8] w-full flex items-center justify-center overflow-x-hidden">
        <div className="absolute top-[5%] left-1/2 -translate-x-1/2 text-center w-[80%] m-w-[800px] font-[Playfair Display] z-10">
          <p className="text-2xl quote playfair text-[#2c2417] italic text-shadown-custom">
            Every soul is either a storyteller or a seeker. Which one are you?
          </p>
        </div>
        <Book />
      </div>
    </>
  );
};

export default StartJourney;
