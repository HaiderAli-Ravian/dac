'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded text-white font-bold flex items-center justify-center text-sm">
            D
          </div>
          <span className="font-semibold text-slate-900">Dealers Auto Center</span>
        </div>

        <nav className="flex gap-6">
          <Link
            href="/"
            className={cn(
              'text-sm transition-colors cursor-pointer',
              pathname === '/'
                ? 'text-blue-600 font-medium'
                : 'text-slate-600 hover:text-slate-900'
            )}
          >
            Listings
          </Link>
          <Link
            href="/register"
            className={cn(
              'text-sm transition-colors cursor-pointer',
              pathname === '/register'
                ? 'text-blue-600 font-medium'
                : 'text-slate-600 hover:text-slate-900'
            )}
          >
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}
