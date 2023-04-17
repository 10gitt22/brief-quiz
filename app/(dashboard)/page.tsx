import Dashboard from 'components/Dashboard/Dashboard';
import { PageWrapper } from 'components/PageWrapper/PageWrapper';
import { Suspense } from 'react';
import DashboardLoading from './loading';

export default function Home() {
  return (
    <PageWrapper>
      <main className="flex justify-center items-center text-app-black h-full">
        <Suspense fallback={<DashboardLoading />}>
          <div className="flex flex-col gap-4 items-center">
            <Dashboard />
          </div>
        </Suspense>
      </main>
    </PageWrapper>
  );
}
