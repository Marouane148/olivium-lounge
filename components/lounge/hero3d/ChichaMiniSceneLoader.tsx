'use client';

import dynamic from 'next/dynamic';

const ChichaMiniScene = dynamic(() => import('./ChichaMiniScene'), {
  ssr: false,
  loading: () => <div className="w-full h-full" aria-hidden="true" />,
});

export default function ChichaMiniSceneLoader() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <ChichaMiniScene />
    </div>
  );
}
