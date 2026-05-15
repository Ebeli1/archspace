'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-brand text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-semibold tracking-tight">
              Arch<span className="text-accent">Space</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/browse" className="text-white/80 hover:text-white text-sm transition-colors">
              Browse
            </Link>
            <Link href="/seller-portal" className="text-white/80 hover:text-white text-sm transition-colors">
              Seller portal
            </Link>
            <Link href="/pricing" className="text-white/80 hover:text-white text-sm transition-colors">
              Pricing
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-3">
            <Link href="/auth" className="text-white/80 hover:text-white text-sm transition-colors">
              Sign in
            </Link>
            <Link href="/upload" className="bg-accent hover:bg-accent-dark text-white text-sm font-medium px-4 py-2 rounded-full transition-colors">
              List a design
            </Link>
          </div>
          
          <button className="md:hidden text-white/80" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      
      {menuOpen && (
        <div className="md:hidden bg-brand-light px-4 py-4 flex flex-col gap-4">
          <Link href="/browse" className="text-white/80" onClick={() => setMenuOpen(false)}>
            Browse designs
          </Link>
          <Link href="/seller-portal" className="text-white/80" onClick={() => setMenuOpen(false)}>
            Seller portal
          </Link>
          <Link href="/auth" className="text-white/80" onClick={() => setMenuOpen(false)}>
            Sign in
          </Link>
          <Link href="/upload" className="bg-accent text-center rounded-full px-4 py-2" onClick={() => setMenuOpen(false)}>
            List a design
          </Link>
        </div>
      )}
    </nav>
  );
}
