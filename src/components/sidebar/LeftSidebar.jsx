import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faFeather,
  faFeatherPointed,
  faGear,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./sidebar.css";

const LeftSidebar = () => {
  return (
    <div className="bg-[#618b5f] text-[#faf8f0] sticky px-8 py-4 top-0 h-screen overflow-y-auto flex w-full flex-col border-r-2 border-[#faf8f01a] ">
      <div className="flex items-center mb-10 px-1 py-0">
        <h1 className="cormorantGaramond gradientText text-3xl mr-2 font-semibold">
          VerseNest
        </h1>
        <div className="animation-bounce text-[#c9b458] text-xl">
          <FontAwesomeIcon icon={faFeather} />
        </div>
      </div>
      <nav className="mb-8 grow">
        <ul>
          <li className="bg-[#c9b45826]">
            <a href="#" className="text-[#c9b458]">
              <FontAwesomeIcon className="text-[#c9b458]" icon={faHome} />
              <span>Home</span>
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faFeatherPointed} />
              <span>New Post</span>
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faEnvelope} />
              <span>Chats</span>
              <span className="bg-[#a0522d] text-white text-xs px-1.5 rounded-2xl mlau py-0.5">3</span>
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faGear} />
              <span>Setting</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default LeftSidebar;
