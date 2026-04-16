'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Home, Clock, BarChart3, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/timeline', label: 'Timeline', icon: Clock },
    { href: '/stats', label: 'Stats', icon: BarChart3 },
  ];

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="KeenKeeper" 
              width={180} 
              height={50} 
              className="h-9 sm:h-10 w-auto" 
              priority 
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {links.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 text-base font-medium transition-colors ${
                    active
                      ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <Icon size={22} />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-xl"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t">
            <div className="flex flex-col gap-2">
              {links.map((link) => {
                const Icon = link.icon;
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-lg font-medium transition-all ${
                      active 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <Icon size={26} />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}