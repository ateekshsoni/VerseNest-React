/**
 * SEO Component
 * 
 * A comprehensive SEO component that handles meta tags, structured data,
 * and Open Graph tags for better search engine optimization.
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = 'VerseNest - Poetry Community Platform',
  description = 'A vibrant poetry community where writers share verses and readers discover beautiful poetry. Connect with poets, explore collections, and immerse yourself in the world of literature.',
  keywords = 'poetry, poems, literature, writers, poets, community, creative writing, verse, literary, artistic expression',
  author = 'VerseNest Team',
  canonical,
  image = '/og-image.jpg',
  imageAlt = 'VerseNest - Poetry Community Platform',
  type = 'website',
  twitterCard = 'summary_large_image',
  structuredData,
  noIndex = false,
  children,
}) => {
  const siteUrl = " http://localhost:5173 " || 'https://versenest.com';
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
  const canonicalUrl = canonical || window.location.href;

  // Default structured data
  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'VerseNest',
    description: description,
    url: siteUrl,
    applicationCategory: 'SocialNetworkingApplication',
    operatingSystem: 'Web',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Organization',
      name: 'VerseNest Team',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#F59E0B" />
      
      {/* Robots Meta */}
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:site_name" content="VerseNest" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={imageAlt} />
      
      {/* Additional Meta Tags for Poetry Platform */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="VerseNest" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
      
      {/* Additional children content */}
      {children}
    </Helmet>
  );
};

/**
 * Article SEO Component
 * 
 * Specialized SEO component for poem/article pages
 */
export const ArticleSEO = ({
  title,
  description,
  author,
  publishedTime,
  modifiedTime,
  tags = [],
  readingTime,
  wordCount,
  ...props
}) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    author: {
      '@type': 'Person',
      name: author,
    },
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    keywords: tags.join(', '),
    wordCount: wordCount,
    timeRequired: readingTime ? `PT${readingTime}M` : undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': window.location.href,
    },
    publisher: {
      '@type': 'Organization',
      name: 'VerseNest',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.REACT_APP_SITE_URL || 'https://versenest.com'}/logo.png`,
      },
    },
  };

  return (
    <SEO
      title={title}
      description={description}
      type="article"
      structuredData={structuredData}
      {...props}
    >
      {/* Article-specific meta tags */}
      <meta property="article:author" content={author} />
      <meta property="article:published_time" content={publishedTime} />
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {tags.map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
    </SEO>
  );
};

/**
 * Profile SEO Component
 * 
 * Specialized SEO component for user profile pages
 */
export const ProfileSEO = ({
  name,
  bio,
  profileImage,
  socialLinks = {},
  poemCount = 0,
  followerCount = 0,
  ...props
}) => {
  const title = `${name} - Poet on VerseNest`;
  const description = bio || `Discover poems by ${name} on VerseNest. A talented poet with ${poemCount} poems and ${followerCount} followers.`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: name,
    description: bio,
    image: profileImage,
    url: window.location.href,
    sameAs: Object.values(socialLinks).filter(Boolean),
    knows: {
      '@type': 'Organization',
      name: 'VerseNest',
    },
    makesOffer: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'CreativeWork',
        name: 'Poetry',
      },
    },
  };

  return (
    <SEO
      title={title}
      description={description}
      type="profile"
      image={profileImage}
      structuredData={structuredData}
      {...props}
    >
      {/* Profile-specific meta tags */}
      <meta property="profile:first_name" content={name.split(' ')[0]} />
      <meta property="profile:last_name" content={name.split(' ').slice(1).join(' ')} />
    </SEO>
  );
};

/**
 * BreadcrumbSEO Component
 * 
 * Adds breadcrumb structured data for better navigation
 */
export const BreadcrumbSEO = ({ items = [] }) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

/**
 * FAQ SEO Component
 * 
 * Adds FAQ structured data
 */
export const FAQSEO = ({ faqs = [] }) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
