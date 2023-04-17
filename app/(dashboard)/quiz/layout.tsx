import { PageWrapper } from 'components/PageWrapper/PageWrapper';
import { Suspense } from 'react';
import QuizLoading from './loading';

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<QuizLoading />}>
      <PageWrapper>
        <main className="h-screen w-full py-[100px] px-5">{children}</main>
      </PageWrapper>
    </Suspense>
  );
}
