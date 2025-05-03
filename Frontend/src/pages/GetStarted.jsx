import React, { useEffect } from "react";

const GetStarted = ({ side, children }) => {
  useEffect(() => {
    const page = document.querySelector(`.${side}-page`);
    if (page) {
      setTimeout(() => {
        page.style.transform = `rotateY(${side === "left" ? "-3deg" : "3deg"})`;
        setTimeout(() => {
          page.style.transform = "";
        }, 1000);
      }, 500);
    }
  }, [side]);
  return (
    <>
      <div className={`page ${side}-page`}>{children}</div>;
    </>
  );
};

export default GetStarted;
