import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Logo + Text */}
          <div className="flex items-center gap-3">
            <Image 
              src="/logo.png" 
              alt="KeenKeeper" 
              width={160} 
              height={45} 
              className="h-8 sm:h-9 w-auto brightness-0 invert" 
              priority 
            />
            <p className="text-lg font-medium hidden sm:block">Keep Your Friendships Alive</p>
          </div>

          {/* Social Icons - Direct public folder */}
          <div className="flex gap-6">
            <a href="#" className="hover:scale-110 transition-transform">
              <Image 
                src="/facebook.png" 
                alt="Facebook" 
                width={32} 
                height={32} 
              />
            </a>
            <a href="#" className="hover:scale-110 transition-transform">
              <Image 
                src="/twitter.png" 
                alt="X" 
                width={32} 
                height={32} 
              />
            </a>
            <a href="#" className="hover:scale-110 transition-transform">
              <Image 
                src="/instagram.png" 
                alt="Instagram" 
                width={32} 
                height={32} 
              />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-sm text-center md:text-right">
            © 2026 KeenKeeper. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}