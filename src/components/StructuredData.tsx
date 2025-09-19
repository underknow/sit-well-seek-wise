// Structured Data Helpers for SEO

export const createWebsiteStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Sit Well Seek Wise",
  "alternateName": "SWSW Reviews",
  "url": "https://sitwellseekwise.com",
  "description": "Reviews détaillées et comparatifs d'experts pour mobilier ergonomique et équipements de bureau",
  "publisher": {
    "@type": "Organization",
    "name": "Sit Well Seek Wise",
    "logo": {
      "@type": "ImageObject",
      "url": "https://sitwellseekwise.com/logo.png"
    }
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://sitwellseekwise.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
});

export const createProductStructuredData = (product: any) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "brand": {
    "@type": "Brand",
    "name": product.brand
  },
  "image": product.image,
  "description": `${product.name} par ${product.brand} - ${product.pros?.join(', ') || 'Mobilier ergonomique premium'}`,
  "sku": product.id,
  "category": product.category,
  "offers": {
    "@type": "Offer",
    "price": product.price?.replace('€', ''),
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": product.brand
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": product.rating,
    "reviewCount": product.reviewCount,
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": {
    "@type": "Review",
    "author": {
      "@type": "Organization",
      "name": "Sit Well Seek Wise"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": product.rating,
      "bestRating": "5",
      "worstRating": "1"
    }
  }
});

export const createArticleStructuredData = (article: any) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.description,
  "image": article.image,
  "author": {
    "@type": "Organization",
    "name": "Sit Well Seek Wise"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Sit Well Seek Wise",
    "logo": {
      "@type": "ImageObject",
      "url": "https://sitwellseekwise.com/logo.png"
    }
  },
  "datePublished": article.datePublished || new Date().toISOString(),
  "dateModified": article.dateModified || new Date().toISOString(),
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": article.url
  }
});

export const createBreadcrumbStructuredData = (breadcrumbs: Array<{name: string; url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": crumb.url
  }))
});

export const createFAQStructuredData = (faqs: Array<{question: string; answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const createOrganizationStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Sit Well Seek Wise",
  "url": "https://sitwellseekwise.com",
  "logo": "https://sitwellseekwise.com/logo.png",
  "description": "Site expert en reviews et comparatifs de mobilier ergonomique et équipements de bureau",
  "sameAs": [
    "https://twitter.com/sitwellseekwise",
    "https://linkedin.com/company/sitwellseekwise"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "contact@sitwellseekwise.com"
  }
});