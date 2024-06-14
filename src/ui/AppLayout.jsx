import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function AppLayout() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />

      <div className="overflow-y-scroll">
        <main className="mx-auto min-h-dvh max-w-6xl">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default AppLayout;
