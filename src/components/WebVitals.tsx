import { useEffect } from 'react';

// Web Vitals monitoring for Core Web Vitals optimization
export const WebVitals = () => {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    // Dynamic import to avoid affecting initial bundle size
    const loadWebVitals = async () => {
      try {
        const { onCLS, onFCP, onLCP, onTTFB } = await import('web-vitals');
        
        // Send metrics to analytics (you can replace this with your analytics service)
        const sendToAnalytics = (metric: any) => {
          // Log to console for now - you can replace with your analytics service
          console.log('Web Vital:', {
            name: metric.name,
            value: metric.value,
            id: metric.id,
            delta: metric.delta,
            entries: metric.entries
          });
        };

        // Monitor Core Web Vitals
        onCLS(sendToAnalytics);
        onFCP(sendToAnalytics);
        onLCP(sendToAnalytics);
        onTTFB(sendToAnalytics);
      } catch (error) {
        console.warn('Failed to load web-vitals:', error);
      }
    };

    loadWebVitals();
  }, []);

  return null; // This component doesn't render anything
};