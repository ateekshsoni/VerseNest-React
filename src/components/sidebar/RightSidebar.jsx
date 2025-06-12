import React, { useState } from "react";
import TrendingPoets from "../WriterComponents/TrendingPoets";
import TrendingHashtags from "../WriterComponents/TrendingHashtags";
import PoemRoulette from "../WriterComponents/PoemRoulette";
import UpcomingEvents from "../WriterComponents/UpcomingEvents";

/**
 * Sample data - In a real application, this would come from an API
 */
const samplePoets = [
  {
    id: 1,
    name: "Emily Verse",
    specialty: "Sonnets & Free Verse",
    avatar: null,
    isFollowing: false,
  },
  {
    id: 2,
    name: "Marcus Rhyme",
    specialty: "Spoken Word Artist",
    avatar: null,
    isFollowing: true,
  },
  {
    id: 3,
    name: "Sara Moon",
    specialty: "Japanese Forms",
    avatar: null,
    isFollowing: false,
  },
];

const sampleHashtags = [
  "#MidnightVerses",
  "#PoetryInMotion",
  "#WordsmithWednesday",
  "#SonnetSunday",
  "#HaikuHorizon",
];

const sampleEvents = [
  {
    id: 1,
    title: "Virtual Open Mic Night",
    date: "15",
    month: "JUN",
    time: "8:00 PM EST",
    location: "Online",
    type: "open-mic",
  },
  {
    id: 2,
    title: "Sonnet Writing Workshop",
    date: "22",
    month: "JUN",
    time: "6:30 PM EST",
    location: "Online",
    type: "workshop",
  },
  {
    id: 3,
    title: "Summer Poetry Challenge",
    date: "30",
    month: "JUN",
    time: "All Day",
    location: "Global",
    type: "challenge",
  },
];

/**
 * Right Sidebar Component
 *
 * Displays trending poets, hashtags, poem roulette, and upcoming events.
 * Features responsive design, accessibility, and interactive elements.
 *
 * @component
 * @returns {JSX.Element} The right sidebar with poetry community features
 */

const RightSidebar = () => {
  const [poets, setPoets] = useState(samplePoets);
  const [isRouletteLoading, setIsRouletteLoading] = useState(false);

  /**
   * Handle follow/unfollow action for poets
   * @param {string} poetName - Name of the poet to follow/unfollow
   */
  const handleFollow = (poetName) => {
    setPoets((prevPoets) =>
      prevPoets.map((poet) =>
        poet.name === poetName
          ? { ...poet, isFollowing: !poet.isFollowing }
          : poet
      )
    );
  };

  /**
   * Handle hashtag click for filtering
   * @param {string} hashtag - Clicked hashtag
   */
  const handleHashtagClick = (hashtag) => {
    console.log("Navigate to hashtag:", hashtag);
    // In a real application, this would navigate to a filtered view
  };

  /**
   * Handle poem roulette click
   */
  const handleRouletteClick = async () => {
    setIsRouletteLoading(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Random poem fetched");
      // In a real application, this would navigate to a random poem
    } finally {
      setIsRouletteLoading(false);
    }
  };

  /**
   * Handle event click for details
   * @param {string} eventTitle - Title of the clicked event
   */
  const handleEventClick = (eventTitle) => {
    console.log("Navigate to event:", eventTitle);
    // In a real application, this would navigate to event details
  };

  return (
    <>
      <aside
        className="
        bg-desaturated-teal text-ivory-white px-6 py-8 sticky top-0 h-screen 
        overflow-y-auto border-l border-white/10 scrollbar-hide
        hidden xl:block w-80 flex-shrink-0
      "
        role="complementary"
        aria-label="Poetry community sidebar"
      >
        {/* Sidebar Header */}
        <header className="mb-8">
          <h2 className="font-poetry text-2xl text-ivory-white mb-2">
            Community
          </h2>
          <p className="text-sm text-ivory-white/70">
            Connect with fellow poets and discover inspiration
          </p>
        </header>

        {/* Main Content */}
        <div className="space-y-0">
          {/* Trending Poets Section */}
          <TrendingPoets poets={poets} onFollow={handleFollow} />

          {/* Trending Hashtags Section */}
          <TrendingHashtags
            hashtags={sampleHashtags}
            onHashtagClick={handleHashtagClick}
          />

          {/* Poem Roulette Section */}
          <PoemRoulette
            onRouletteClick={handleRouletteClick}
            isLoading={isRouletteLoading}
          />

          {/* Upcoming Events Section */}
          <UpcomingEvents
            events={sampleEvents}
            onEventClick={handleEventClick}
          />
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-white/10">
          <div className="text-center text-xs text-ivory-white/50 space-y-2">
            <p>© 2025 VerseNest</p>
            <div className="flex justify-center space-x-4">
              <button
                className="hover:text-antique-gold transition-colors"
                aria-label="Privacy policy"
              >
                Privacy
              </button>
              <button
                className="hover:text-antique-gold transition-colors"
                aria-label="Terms of service"
              >
                Terms
              </button>
              <button
                className="hover:text-antique-gold transition-colors"
                aria-label="Help and support"
              >
                Help
              </button>
            </div>
          </div>
        </footer>
      </aside>
    </>
  );
};

export default RightSidebar;
