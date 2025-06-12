# Writer Components - VerseNest React

This directory contains reusable, accessible, and SEO-optimized components for the VerseNest writer interface.

## 🚀 Refactoring Complete

The `HomeMainContent` component has been successfully refactored from a monolithic structure to a modular, component-based architecture with the following improvements:

### ✨ Key Features

- **Modular Architecture**: Broken down into reusable components
- **Accessibility First**: ARIA labels, semantic HTML, keyboard navigation
- **SEO Optimized**: Proper heading hierarchy and semantic structure
- **Tailwind CSS**: Converted from vanilla CSS to utility-first approach
- **Theme System**: 5 different poem card themes with custom styling
- **Interactive**: Dynamic state management for likes, bookmarks, and filters

## 📁 Component Structure

```
WriterComponents/
├── HomeMainContent.jsx      # Main container component (refactored)
├── HeroSection.jsx         # Hero section with animated text waves
├── FeedHeader.jsx          # Feed header with filtering options
├── PoemCard.jsx            # Poem display card with theme support
├── FloatingActionButton.jsx # Floating action button for writing
└── README.md               # This documentation
```

## 🎨 Available Themes

The `PoemCard` component supports 5 themes:

1. **Default**: Clean, modern design with warm colors
2. **Dark**: Dark background with light text
3. **Vintage**: Aged parchment with decorative patterns
4. **Minimal**: Clean, minimalist design with center alignment
5. **Ink-blot**: Creative design with decorative ink blot effects

## 🔧 Usage

### HomeMainContent

The main component that orchestrates all sub-components:

```jsx
import HomeMainContent from './components/WriterComponents/HomeMainContent'

function App() {
  return <HomeMainContent />
}
```

### Individual Components

All components can be used independently:

```jsx
import { HeroSection, FeedHeader, PoemCard, FloatingActionButton } from './components/WriterComponents'

// Hero Section
<HeroSection 
  title="Your Custom Title"
  onCtaClick={handleStartWriting}
  backgroundWaves={["wave 1", "wave 2", "wave 3"]}
/>

// Poem Card
<PoemCard
  title="Poem Title"
  content={["Stanza 1", "Stanza 2"]}
  author={{ name: "Author", username: "@author", avatar: "path/to/avatar" }}
  theme="dark"
  onLike={handleLike}
  onComment={handleComment}
  onBookmark={handleBookmark}
  onShare={handleShare}
/>
```

## 🎯 Props Documentation

### HeroSection
- `title` (string): Main headline text
- `subtitle` (string, optional): Secondary text
- `onCtaClick` (function): Callback for CTA button
- `backgroundWaves` (array): Array of text for animated waves
- `className` (string, optional): Additional CSS classes

### FeedHeader
- `title` (string): Section title
- `activeFilter` (string): Currently active filter
- `onFilterChange` (function): Filter change callback
- `filterOptions` (array): Available filter options
- `className` (string, optional): Additional CSS classes

### PoemCard
- `title` (string): Poem title
- `content` (array): Array of poem stanzas
- `author` (object): Author information
- `timestamp` (string): Publication time
- `likes` (number): Like count
- `comments` (number): Comment count
- `isLiked` (boolean): Like state
- `isBookmarked` (boolean): Bookmark state
- `theme` (string): Theme variant
- `onLike`, `onComment`, `onBookmark`, `onShare` (functions): Interaction callbacks

### FloatingActionButton
- `onClick` (function): Click callback
- `icon` (string): FontAwesome icon class
- `ariaLabel` (string): Accessibility label
- `tooltip` (string, optional): Tooltip text
- `className` (string, optional): Additional CSS classes

## 🎨 Custom CSS Variables

The components use CSS custom properties for theming:

```css
:root {
  /* Colors */
  --aged-parchment: #f5ecd9;
  --burnt-sienna: #a0522d;
  --sepia-ink: #3e2723;
  --ivory-white: #faf8f0;
  
  /* Typography */
  --font-poetry: "Cormorant Garamond", serif;
  --font-ui: "Open Sans", sans-serif;
  
  /* Animations */
  --transition-smooth: all 0.3s ease;
  --transition-bounce: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

## 📱 Responsive Design

All components are fully responsive and work across:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## ♿ Accessibility Features

- **Semantic HTML**: Proper use of headings, sections, and landmarks
- **ARIA Labels**: Screen reader friendly labels and descriptions
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Focus Management**: Visible focus indicators and logical tab order
- **Color Contrast**: WCAG AA compliant color combinations
- **Alternative Text**: Descriptive alt text for images

## 🔄 State Management

The components use React hooks for state management:
- `useState` for local component state
- Props for data passing between components
- Callback functions for event handling

## 🚀 Performance Optimizations

- **Minimal Re-renders**: Efficient state updates
- **CSS Transitions**: Hardware-accelerated animations
- **Lazy Loading**: Images loaded on demand
- **Semantic HTML**: Better browser parsing

## 🔮 Future Enhancements

- [ ] Internationalization (i18n) support
- [ ] Advanced filtering and search
- [ ] Real-time collaboration features
- [ ] Advanced theming system
- [ ] Performance monitoring
- [ ] Unit and integration tests

---

**Last Updated**: June 12, 2025  
**Version**: 2.0.0  
**Author**: VerseNest Development Team
