'use client';

import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('./Scene'), {
  ssr: false,
  loading: () => <div className="w-full h-full" aria-hidden="true" />,
});

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-[1]" aria-hidden="true">
      <Scene />
    </div>
  );
}
