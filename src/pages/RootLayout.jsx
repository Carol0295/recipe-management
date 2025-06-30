import { Outlet } from 'react-router-dom';
import Header from '../components/Header.jsx';

export default function RootLayout() {
  return (
    <div>
      <main className="p-6">
        <Header/>
        <Outlet />
      </main>
    </div>
  );
}
