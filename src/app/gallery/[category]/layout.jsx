import { Suspense } from 'react';

// cacheComponents açıkken useParams() kullanan sayfa Suspense içinde olmalı
export default function GalleryLayout({ children }) {
  return (
    <Suspense fallback={<main className="bg-black min-h-screen" />}>
      {children}
    </Suspense>
  );
}
