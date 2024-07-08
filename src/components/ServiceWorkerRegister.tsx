// components/ServiceWorkerRegister.tsx
"use client";

import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      if (process.env.NODE_ENV === 'production') {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js').then(
            (registration) => {
              console.log('Service Worker registered with scope:', registration.scope);
            },
            (error) => {
              console.log('Service Worker registration failed:', error);
            }
          );
        });
      }
    }
  }, []);

  return null;
}
