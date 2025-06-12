import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

/**
 * Individual event card component
 * @param {string} title - Event title
 * @param {string} date - Event date (format: DD)
 * @param {string} month - Event month (format: MMM)
 * @param {string} time - Event time
 * @param {string} location - Event location
 * @param {string} type - Event type for styling
 * @param {function} onClick - Click handler for event
 */
const EventCard = ({ 
  title, 
  date, 
  month, 
  time, 
  location, 
  type = 'default',
  onClick 
}) => {
  const eventId = title ? title.toLowerCase().replace(/\s+/g, '-') : 'event';

  // Different colors for different event types
  const getEventTypeColor = () => {
    switch (type) {
      case 'workshop':
        return 'bg-forest-moss';
      case 'challenge':
        return 'bg-antique-gold';
      case 'open-mic':
        return 'bg-burnt-sienna';
      default:
        return 'bg-burnt-sienna';
    }
  };

  return (
    <article 
      className="flex items-center p-3 bg-white/10 backdrop-blur-sm rounded-verse-md transition-smooth border border-white/10 hover:bg-white/15 group cursor-pointer"
      role="article"
      aria-labelledby={`event-${eventId}`}
      onClick={() => onClick?.(title)}
    >
      {/* Event Date */}
      <div 
        className={`
          flex flex-col items-center justify-center w-12 h-12 ${getEventTypeColor()}
          rounded-verse-sm mr-4 text-white flex-shrink-0 group-hover:scale-105 transition-transform
        `}
        aria-label={`${month} ${date}`}
      >
        <span className="text-lg font-bold leading-none">
          {date}
        </span>
        <span className="text-xs uppercase font-medium">
          {month}
        </span>
      </div>

      {/* Event Details */}
      <div className="flex-grow min-w-0">
        <h4 
          id={`event-${eventId}`}
          className="text-sm font-semibold text-ivory-white mb-1 truncate font-ui group-hover:text-antique-gold transition-colors"
        >
          {title}
        </h4>
        <div className="flex items-center text-xs text-ivory-white/70 space-x-2">
          <time dateTime={`${date} ${month}`}>
            {time}
          </time>
          <span>•</span>
          <span className="truncate">
            {location}
          </span>
        </div>
      </div>

      {/* Event Type Badge */}
      {type !== 'default' && (
        <div className="ml-2 flex-shrink-0">
          <span className={`
            inline-block px-2 py-1 text-xs rounded-full capitalize
            ${type === 'workshop' ? 'bg-forest-moss/20 text-forest-moss' : ''}
            ${type === 'challenge' ? 'bg-antique-gold/20 text-antique-gold' : ''}
            ${type === 'open-mic' ? 'bg-burnt-sienna/20 text-burnt-sienna' : ''}
          `}>
            {type.replace('-', ' ')}
          </span>
        </div>
      )}

      {/* Arrow indicator */}
      <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <FontAwesomeIcon icon={faChevronRight} className='text-xs text-[#faf8f0]/50'/>
      </div>
    </article>
  );
};

/**
 * Upcoming events section component
 * @param {array} events - Array of event objects
 * @param {function} onEventClick - Click handler for events
 */
const UpcomingEvents = ({ events = [], onEventClick }) => {
  return (
    <section 
      className="mb-10"
      aria-labelledby="upcoming-events-heading"
    >
      <h3 
        id="upcoming-events-heading"
        className="font-poetry text-xl text-ivory-white mb-5 relative pb-2"
      >
        Upcoming Events
        <span 
          className="absolute bottom-0 left-0 w-10 h-0.5 bg-gradient-to-r from-[#c9b458] to-transparent"
          aria-hidden="true"
        />
      </h3>

      <div 
        className="flex flex-col gap-3" 
        role="list"
        aria-label="Upcoming poetry events"
      >
        {events.length > 0 ? (
          events.map((event, index) => (
            <EventCard
              key={event.id || index}
              title={event.title}
              date={event.date}
              month={event.month}
              time={event.time}
              location={event.location}
              type={event.type}
              onClick={onEventClick}
            />
          ))
        ) : (
          <div className="text-center py-8 text-ivory-white/50">
            <i className="fas fa-calendar-alt text-2xl mb-2" aria-hidden="true" />
            <p className="text-sm">No upcoming events</p>
            <p className="text-xs mt-1">Check back soon for new poetry events!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingEvents;
