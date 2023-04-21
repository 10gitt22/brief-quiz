'use client';
import Dashboard from 'components/Dashboard/Dashboard';
import { PageWrapper } from 'components/PageWrapper/PageWrapper';
import { Suspense, useMemo } from 'react';
import DashboardLoading from './loading';
import { useAuth } from 'contexts/auth';
import AdminDashboard from 'components/Dashboard/AdminDashboard';
import Link from 'next/link';

export default function Home() {
  const { firestoreUser } = useAuth();
  const isAdmin = useMemo(() => {
    if (!firestoreUser) return false;

    return firestoreUser.role === 'admin';
  }, [firestoreUser]);

  if (!firestoreUser) {
    return <DashboardLoading />;
  }

  return (
    <PageWrapper>
      <main className="flex justify-center items-center text-app-black h-full pt-[100px] px-5">
        <Suspense fallback={<DashboardLoading />}>
          {isAdmin ? (
            <div className="w-full h-full relative">
              <div className="top-0 font-bold flex w-full gap-3 justify-end mb-10 border-b py-2">
                <Link className="underline" href={'/'}>
                  Відповіді
                </Link>
                <Link className="hover:underline" href={'/admin/quizes'}>
                  Опитування
                </Link>
              </div>
              <AdminDashboard />
            </div>
          ) : (
            <Dashboard />
          )}
        </Suspense>
      </main>
    </PageWrapper>
  );
}
