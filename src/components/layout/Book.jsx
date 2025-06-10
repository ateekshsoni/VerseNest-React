import React, { useState } from "react";
import Page from "./Page";
import WriterForm from "../auth/WriterForm";
import ReaderForm from "../auth/ReaderForm";

const Book = () => {
  // State for both forms
  const [writerShowForm, setWriterShowForm] = useState(false); // default: RoleSelector
  const [writerActiveTab, setWriterActiveTab] = useState("signup");
  const [readerShowForm, setReaderShowForm] = useState(false); // default: RoleSelector
  const [readerActiveTab, setReaderActiveTab] = useState("signup");

  // When opening writer, reset reader
  const handleWriterOpen = (tab = "signup") => {
    setWriterShowForm(true);
    setWriterActiveTab(tab);
    setReaderShowForm(false);
    setReaderActiveTab("signup");
  };
  // When opening reader, reset writer
  const handleReaderOpen = (tab = "signup") => {
    setReaderShowForm(true);
    setReaderActiveTab(tab);
    setWriterShowForm(false);
    setWriterActiveTab("signup");
  };

  return (
    <>
      <div className="w-[90%] max-w-[1200px] h-[80vh] perspective-distant max-h-[800px] mt-[80px] mx-auto mb-[40px]">
        <div className="w-full h-full relative transform-3d flex rounded-sm shadow-[rgba(0,0,0,0.2)] shadow-2xl">
          <Page side="left" bgColor="bg-[#f8f3e8]" pageType="writer-page">
            <WriterForm
              showForm={writerShowForm}
              setShowForm={setWriterShowForm}
              activeTab={writerActiveTab}
              setActiveTab={setWriterActiveTab}
              onOpen={handleWriterOpen}
            />
          </Page>
          <div className="w-5 bg-gradient-to-r from-[#d9c7a7] via-[#c9b28f] to-[#d9c7a7] relative shadow-[inset_-2px_0_3px_rgba(0,0,0,0.1),inset_2px_0_3px_rgba(0,0,0,0.1)] before:content-[''] before:absolute before:w-full before:h-0.5 before:bg-[#a89878] before:top-[30px] after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-[#a89878] after:bottom-[30px]"></div>
          <Page side="right" bgColor="bg-[#e8f1f8]" pageType="reader-page">
            <ReaderForm
              showForm={readerShowForm}
              setShowForm={setReaderShowForm}
              activeTab={readerActiveTab}
              setActiveTab={setReaderActiveTab}
              onOpen={handleReaderOpen}
            />
          </Page>
        </div>
      </div>
    </>
  );
};

export default Book;
