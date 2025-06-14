import React from "react";
import { Routes, Route } from "react-router-dom";
import ComingSoonPage from "./Pages/ComingSoonPage";
import WriterHome from "./Pages/WriterHome";
import StartJourney from "./Pages/StartJourney";
import ReaderHomePage from "./Pages/ReaderHomePage";
import InboxPage from "./Pages/InboxPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ComingSoonPage />} /> {/* Default route */}
        <Route path="/start-your-journey" element={<StartJourney />} /> 
        <Route path="/writer/home" element={<WriterHome />} />
        <Route path="/reader/home" element={<ReaderHomePage />} />
        <Route path="/inbox" element={<InboxPage />} />
      </Routes>
    </>
  );
};

export default App;
