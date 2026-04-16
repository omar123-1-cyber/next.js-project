import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { InteractionProvider } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'KeenKeeper — Keep Your Friendships Alive',
  description: 'Never lose touch with the people who matter',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <InteractionProvider>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </InteractionProvider>
      </body>
    </html>
  );
}