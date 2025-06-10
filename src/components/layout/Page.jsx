import React, { useEffect, useState } from "react";

const Page = ({ side, bgColor, pageType, children }) => {
  const [rotation, setrotation] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setrotation(side === "left" ? "-rotate-y-3" : "rotate-y-3");
      const resetTimer = setTimeout(() => {
        setrotation("");
      }, 1000);
      return () => clearTimeout(resetTimer);
    }, 500);
    return () => clearTimeout(timer);
  }, [side]);
  const handleMouseEnter = () => {
    setrotation(side === "left" ? "-rotate-y-2" : "rotate-y-2");
  };
  const handleMouseLeave = () => {
    setrotation("");
  };
  const borderRadius = side === "left" ? "rounded-l" : "rounded-r";
  const shadow =
    side === "left"
      ? "shadow-[inset_-10px_0_20px_-10px_rgba(0,0,0,0.2)]"
      : "shadow-[inset_10px_0_20px_-10px_rgba(0,0,0,0.2)]";

  return (
    <>
      <div
        className={`w-1/2 h-full relative ${bgColor} ${shadow} ${borderRadius} ${pageType} transform-3d `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="p-10 h-full overflow-y-auto scrollbar-hide flex flex-col justify-center">
          {children}
        </div>
      </div>
    </>
  );
};

export default Page;
