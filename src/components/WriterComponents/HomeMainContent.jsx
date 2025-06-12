import React, { useState } from 'react'
import HeroSection from './HeroSection'
import FeedHeader from './FeedHeader'
import PoemCard from './PoemCard'
import FloatingActionButton from './FloatingActionButton'
import ErrorBoundary from './ErrorBoundary'

/**
 * Sample poem data - In a real application, this would come from an API or state management
 */
const samplePoems = [
  {
    id: 1,
    title: "Whispers of Dawn",
    content: [
      "In the quiet moments before sunrise,\nWhen the world holds its breath in anticipation,\nI find the words that have been hiding,\nBehind the veil of night's contemplation.",
      "Whispers of dawn break through the silence,\nPainting the sky with promises anew,\nEach ray of light, a verse of hope,\nEach shadow, a memory of you."
    ],
    author: {
      name: "Robert Wordsmith",
      username: "@wordsmith",
      avatar: "img/Rabindranath.avif"
    },
    timestamp: "2 hours ago",
    likes: 142,
    comments: 24,
    isLiked: false,
    isBookmarked: false,
    theme: "default"
  },
  {
    id: 2,
    title: "Midnight Thoughts",
    content: [
      "Stars punctuate the darkness,\nLike periods at the end of heaven's sentences.\nI collect them in jars of memory,\nTo illuminate my darkest thoughts.",
      "In this midnight hour,\nWords become constellations,\nMapping the universe within."
    ],
    author: {
      name: "Sophia Night",
      username: "@nightverse",
      avatar: null
    },
    timestamp: "5 hours ago",
    likes: 89,
    comments: 12,
    isLiked: false,
    isBookmarked: false,
    theme: "dark"
  },
  {
    id: 3,
    title: "Echoes of Time",
    content: [
      "Time-worn pages whisper tales of old,\nInk-stained fingers trace the words of gold.\nIn dusty tomes and leather-bound dreams,\nThe past and present intertwine, it seems.",
      "Like autumn leaves that fall with grace,\nOur stories drift through time and space.\nYet in these verses, we remain,\nImmortal souls that words contain."
    ],
    author: {
      name: "James Austen",
      username: "@classicverse",
      avatar: null
    },
    timestamp: "Yesterday",
    likes: 215,
    comments: 43,
    isLiked: false,
    isBookmarked: false,
    theme: "vintage"
  },
  {
    id: 4,
    title: "Spaces",
    content: [
      "between\nwords",
      "silence\nspeaks",
      "loudest"
    ],
    author: {
      name: "Luna Min",
      username: "@minverse",
      avatar: null
    },
    timestamp: "2 days ago",
    likes: 176,
    comments: 18,
    isLiked: false,
    isBookmarked: false,
    theme: "minimal"
  },
  {
    id: 5,
    title: "Spilled Ink",
    content: [
      "Words spill across the page,\nLike ink from an overturned bottle.\nSome form perfect lines,\nOthers create beautiful accidents.",
      "I am the vessel,\nThe container of thoughts,\nBut sometimes the best poetry,\nComes when I'm broken open."
    ],
    author: {
      name: "David Inkwell",
      username: "@inkpoet",
      avatar: null
    },
    timestamp: "3 days ago",
    likes: 132,
    comments: 27,
    isLiked: false,
    isBookmarked: false,
    theme: "ink-blot"
  }
];

/**
 * HomeMainContent Component
 * 
 * Main content area for the writer's home page featuring a hero section,
 * feed header with filtering options, and a collection of poem cards.
 * Uses reusable components for better maintainability and SEO optimization.
 * 
 * @component
 * @returns {JSX.Element} The main content component with hero section, feed, and poems
 */
const HomeMainContent = () => {
  const [poems, setPoems] = useState(samplePoems);
  const [activeFilter, setActiveFilter] = useState('Following');

  /**
   * Handle filter change in the feed header
   * @param {string} filter - The selected filter ('Following' or 'Discover')
   */
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    // In a real application, this would trigger an API call to fetch filtered poems
  };

  /**
   * Handle poem interactions (like, bookmark, share)
   * @param {number} poemId - The ID of the poem to interact with
   * @param {string} action - The type of interaction ('like', 'bookmark', 'share')
   */
  const handlePoemInteraction = (poemId, action) => {
    setPoems(prevPoems => 
      prevPoems.map(poem => {
        if (poem.id === poemId) {
          switch (action) {
            case 'like':
              return {
                ...poem,
                isLiked: !poem.isLiked,
                likes: poem.isLiked ? poem.likes - 1 : poem.likes + 1
              };
            case 'bookmark':
              return {
                ...poem,
                isBookmarked: !poem.isBookmarked
              };
            default:
              return poem;
          }
        }
        return poem;
      })
    );
  };

  /**
   * Handle floating action button click (start writing)
   */
  const handleStartWriting = () => {
    // In a real application, this would navigate to the writing interface
    console.log('Start writing clicked');
  };

  return (
    <>
      {/* Main content container with Tailwind styling */}
      <main 
        className="bg-aged-parchment p-8 overflow-y-auto relative min-h-screen"
        role="main"
        aria-label="Poetry feed and writing interface"
      >
        {/* Hero Section */}
        <HeroSection 
          title="Ink your soul. Verse the world."
          onCtaClick={handleStartWriting}
          backgroundWaves={[
            "poetry flows like rivers through the soul of time...",
            "words dance upon the page like autumn leaves...",
            "verses whisper secrets of the heart..."
          ]}
        />

        {/* Feed Section */}
        <section 
          className="relative"
          aria-label="Poetry feed"
        >
          {/* Feed Header with filters */}
          <FeedHeader 
            title="Your Poetic Feed"
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            filterOptions={['Following', 'Discover']}
          />

          {/* Poem Cards Container */}
          <div 
            className="flex flex-col gap-8"
            role="feed"
            aria-label="List of poems"
          >
            {poems.map(poem => (
              <ErrorBoundary key={poem.id}>
                <PoemCard
                  title={poem.title}
                  content={poem.content}
                  author={poem.author}
                  timestamp={poem.timestamp}
                  likes={poem.likes}
                  comments={poem.comments}
                  isLiked={poem.isLiked}
                  isBookmarked={poem.isBookmarked}
                  theme={poem.theme}
                  onLike={() => handlePoemInteraction(poem.id, 'like')}
                  onComment={() => console.log('Comment on poem', poem.id)}
                  onBookmark={() => handlePoemInteraction(poem.id, 'bookmark')}
                  onShare={() => handlePoemInteraction(poem.id, 'share')}
                />
              </ErrorBoundary>
            ))}
          </div>

          {/* Floating Action Button for writing */}
          <FloatingActionButton 
            onClick={handleStartWriting}
            icon="fas fa-feather-alt"
            ariaLabel="Start writing a new poem"
            tooltip="Write a new poem"
          />
        </section>
      </main>
    </>
  )
}

export default HomeMainContent