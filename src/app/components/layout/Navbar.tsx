'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Upload } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-brand text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-semibold tracking-tight">
              Arch<span className="text-accent">Space</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/browse" className="text-white/70 hover:text-white text-sm transition-colors">
              Browse
            </Link>
            <Link href="/dashboard" className="text-white/70 hover:text-white text-sm transition-colors">
              Seller portal
            </Link>
            <Link href="/upload" className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-white text-sm font-medium px-4 py-2 rounded-full transition-colors">
              <Upload size={14} /> List a design
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link href="/auth" className="text-white/70 hover:text-white text-sm transition-colors">
              Sign in
            </Link>
          </div>
          <button className="md:hidden text-white/70 hover:text-white" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-brand-light border-t border-white/10 px-4 py-4 flex flex-col gap-4">
          <Link href="/browse" className="text-white/80 text-sm" onClick={() => setMenuOpen(false)}>
            Browse designs
          </Link>
          <Link href="/dashboard" className="text-white/80 text-sm" onClick={() => setMenuOpen(false)}>
            Seller portal
          </Link>
          <Link href="/auth" className="text-white/80 text-sm" onClick={() => setMenuOpen(false)}>
            Sign in
          </Link>
          <Link href="/upload" className="btn-accent text-center text-sm rounded-full px-4 py-2" onClick={() => setMenuOpen(false)}>
            List a design
          </Link>
        </div>
      )}
    </nav>
  );
}