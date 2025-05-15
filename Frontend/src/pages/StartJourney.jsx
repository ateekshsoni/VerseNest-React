import React from "react";
import BackgroundAnimation from "../components/layout/BackGroundAnimation";
import Book from "../components/layout/Book";
import Quote from "../components/ui/Quote";
const StartJourney = () => {
  return (
    <>
      <div className="relative min-h-screen bg-[#f5f1e8] w-full flex justify-center items-center overflow-x-hidden">
        <BackgroundAnimation />

        <div className="absolute top-[5%] left-1/2 transform -translate-x-1/2 text-center w-4/5 max-w-3xl z-10 bg-red-50">
          <Quote text="Every soul is either a storyteller or a seeker. Which one are you?" />
        </div>

        <Book />
      </div>
    </>
  );
};

export default StartJourney;
