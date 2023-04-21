'use client';
import Dashboard from 'components/Dashboard/Dashboard';
import { PageWrapper } from 'components/PageWrapper/PageWrapper';
import { Suspense, useMemo } from 'react';
import DashboardLoading from './loading';
import { useAuth } from 'contexts/auth';
import AdminDashboard from 'components/Dashboard/AdminDashboard';

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
          {isAdmin ? <AdminDashboard /> : <Dashboard />}
        </Suspense>
      </main>
    </PageWrapper>
  );
}
