import Header from 'components/Header/Header';
import { PageWrapper } from 'components/PageWrapper/PageWrapper';

export default function Home() {
  return (
    <PageWrapper>
      <Header />
      <main className="text-app-black"></main>
    </PageWrapper>
  );
}
