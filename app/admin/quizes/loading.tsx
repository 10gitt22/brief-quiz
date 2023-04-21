'use client';

import { TailSpin } from 'react-loader-spinner';

export default function QuizesLoading() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <TailSpin height="80" width="80" color="#222" />{' '}
    </div>
  );
}
