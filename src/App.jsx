import React from "react";
import StartJourney from "./pages/StartJourney";
import { Route, Router, Routes } from "react-router-dom";
import CommingSoonPage from "./Pages/ComingSoonPage";
import WriterHome from "./Pages/WriterHome";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<CommingSoonPage />} />
        <Route path="/start-your-journey" element={<StartJourney />} />
        <Route path="/writer/home" element={<WriterHome />} />
      </Routes>
    </>
  );
};

export default App;
