import { PageWrapper } from 'components/PageWrapper/PageWrapper';

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageWrapper>
      <main className="h-screen w-full py-[100px] px-5">{children}</main>
    </PageWrapper>
  );
}
