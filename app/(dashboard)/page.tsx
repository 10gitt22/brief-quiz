import Dashboard from 'components/Dashboard/Dashboard';
import { PageWrapper } from 'components/PageWrapper/PageWrapper';
import { Suspense } from 'react';
import DashboardLoading from './loading';

export default function Home() {
  return (
    <PageWrapper>
      <main className="flex justify-center items-center text-app-black h-full pt-[100px] px-5">
        <Suspense fallback={<DashboardLoading />}>
          <Dashboard />
        </Suspense>
      </main>
    </PageWrapper>
  );
}
