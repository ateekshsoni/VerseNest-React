import React from "react";
import Page from "./Page";
import WriterForms from "../auth/WriterForms"
import ReaderForms from "../auth/ReaderForms";
const Book = () => {
  return (
    <>
      <div className="w-[90%] max-w-6xl h-[80vh] max-h-[800px] mt-20 mb-10 perspective-[1500px]">
        <div className="w-full h-full relative flex shadow-2xl rounded">
          {/* Left page - Writer */}
          <Page side="left" bgColor="bg-[#f8f3e8]" pageType="writer-page">
            <WriterForms />
          </Page>

          {/* Book spine */}
          <div className="w-5 bg-gradient-to-r from-[#d9c7a7] via-[#c9b28f] to-[#d9c7a7] relative shadow-[inset_-2px_0_3px_rgba(0,0,0,0.1),inset_2px_0_3px_rgba(0,0,0,0.1)] before:content-[''] before:absolute before:w-full before:h-0.5 before:bg-[#a89878] before:top-[30px] after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-[#a89878] after:bottom-[30px]"></div>

          {/* Right page - Reader */}
          <Page side="right" bgColor="bg-[#e8f1f8]" pageType="reader-page">
            <ReaderForms />
          </Page>
        </div>
      </div>
    </>
  );
};

export default Book;
