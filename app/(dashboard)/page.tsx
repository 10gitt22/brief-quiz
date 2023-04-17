import Dashboard from 'components/Dashboard/Dashboard';
import { PageWrapper } from 'components/PageWrapper/PageWrapper';

export default function Home() {
  return (
    <PageWrapper>
      <main className="flex justify-center items-center text-app-black h-full">
        <div className="flex flex-col gap-4 items-center">
          <Dashboard />
        </div>
      </main>
    </PageWrapper>
  );
}
