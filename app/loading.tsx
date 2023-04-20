'use client';

import { TailSpin } from 'react-loader-spinner';

export default function Loading() {
  return (
    <div className="h-full  w-full flex text-7xl justify-center items-center">
      <TailSpin height="80" width="80" color="#222" />{' '}
    </div>
  );
}
