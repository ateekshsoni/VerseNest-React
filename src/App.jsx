import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import CommingSoonPage from "./Pages/ComingSoonPage";
import WriterHome from "./Pages/WriterHome";
import StartJourney from "./Pages/StartJourney";
import ReaderHomePage from "./Pages/ReaderHomePage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<CommingSoonPage />} />
        <Route path="/start-your-journey" element={<StartJourney />} />
        <Route path="/writer/home" element={<WriterHome />} />
        <Route path="/reader/home" element={<ReaderHomePage />} />
      </Routes>
    </>
  );
};

export default App;
