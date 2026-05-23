'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Upload, Home, Compass, LayoutDashboard, CreditCard, User, LogOut, Sparkles, RefreshCw, Search, ChevronDown } from 'lucide-react';
import { useRole } from '@/context/RoleContext';

const AI_LINKS = [
  { href: '/ai/studio', icon: <Sparkles size={13} />, label: 'AI Design Studio', desc: 'Create from scratch' },
  { href: '/ai/remodel', icon: <RefreshCw size={13} />, label: 'Remodel Assistant', desc: 'Improve your plans' },
  { href: '/ai/advisor', icon: <Search size={13} />, label: 'Design Advisor', desc: 'Find the right design' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const { role, setRole } = useRole();
  
  const isSignedIn = role !== null;

  const handleLogout = () => {
    setRole(null);
    window.location.href = '/';
  };

  return (
    <nav className="bg-[#1A1A2E] text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center shrink-0">
            <span className="text-xl font-semibold tracking-tight">
              Arch<span className="text-[#C8A96E]">Space</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-white/70 hover:text-white text-sm transition-colors flex items-center gap-1">
              <Home size={16} /> Home
            </Link>
            <Link href="/browse" className="text-white/70 hover:text-white text-sm transition-colors flex items-center gap-1">
              <Compass size={16} /> Browse
            </Link>
            
            <div 
              className="relative" 
              onMouseEnter={() => setAiOpen(true)} 
              onMouseLeave={() => setAiOpen(false)}
            >
              <button className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors">
                <Sparkles size={13} className="text-accent" />
                AI Features
                <ChevronDown size={12} className={`transition-transform ${aiOpen ? 'rotate-180' : ''}`} />
              </button>
              {aiOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden py-1">
                    {AI_LINKS.map(link => (
                      <Link 
                        key={link.href} 
                        href={link.href}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                      >
                        <span className="text-accent">{link.icon}</span>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{link.label}</p>
                          <p className="text-xs text-gray-400">{link.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {role === 'seller' && (
              <Link href="/dashboard" className="text-white/70 hover:text-white text-sm transition-colors flex items-center gap-1">
                <LayoutDashboard size={16} /> Dashboard
              </Link>
            )}
            
            <Link href="/pricing" className="text-white/70 hover:text-white text-sm transition-colors flex items-center gap-1">
              <CreditCard size={16} /> Pricing
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-3">
            {isSignedIn ? (
              <>
                <span className="text-white/60 text-sm flex items-center gap-1">
                  <User size={14} />
                  {role === 'seller' ? 'Seller' : 'Buyer'}
                </span>
                <button onClick={handleLogout} className="text-white/70 hover:text-white text-sm transition-colors flex items-center gap-1">
                  <LogOut size={14} />
                  Logout
                </button>
              </>
            ) : (
              <Link href="/auth" className="text-white/70 hover:text-white text-sm transition-colors">
                Sign in
              </Link>
            )}
            
            <Link href="/upload" className="bg-[#C8A96E] hover:bg-[#8B6A2E] text-white text-sm font-medium px-4 py-2 rounded-full transition-colors flex items-center gap-1">
              <Upload size={14} />
              List a design
            </Link>
          </div>
          
          <button className="md:hidden text-white/70 hover:text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      
      {menuOpen && (
        <div className="md:hidden bg-[#2D2D4E] px-4 py-4 flex flex-col gap-3">
          <Link href="/" className="text-white/80 hover:text-white py-2 flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <Home size={16} /> Home
          </Link>
          <Link href="/browse" className="text-white/80 hover:text-white py-2 flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <Compass size={16} /> Browse
          </Link>
          
          <div className="pl-2 border-l-2 border-accent/30">
            <p className="text-accent text-xs font-semibold mb-2">AI Features</p>
            <Link href="/ai/studio" className="text-white/80 hover:text-white py-2 flex items-center gap-2 text-sm" onClick={() => setMenuOpen(false)}>
              <Sparkles size={14} /> AI Design Studio
            </Link>
            <Link href="/ai/remodel" className="text-white/80 hover:text-white py-2 flex items-center gap-2 text-sm" onClick={() => setMenuOpen(false)}>
              <RefreshCw size={14} /> Remodel Assistant
            </Link>
            <Link href="/ai/advisor" className="text-white/80 hover:text-white py-2 flex items-center gap-2 text-sm" onClick={() => setMenuOpen(false)}>
              <Search size={14} /> Design Advisor
            </Link>
          </div>
          
          {role === 'seller' && (
            <Link href="/dashboard" className="text-white/80 hover:text-white py-2 flex items-center gap-2" onClick={() => setMenuOpen(false)}>
              <LayoutDashboard size={16} /> Dashboard
            </Link>
          )}
          
          <Link href="/pricing" className="text-white/80 hover:text-white py-2 flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <CreditCard size={16} /> Pricing
          </Link>
          
          <hr className="border-white/20 my-2" />
          
          {isSignedIn ? (
            <>
              <span className="text-white/60 py-2 flex items-center gap-2">
                <User size={16} /> Logged in as {role}
              </span>
              <button onClick={handleLogout} className="text-white/80 hover:text-white py-2 flex items-center gap-2 text-left">
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <Link href="/auth" className="text-white/80 hover:text-white py-2" onClick={() => setMenuOpen(false)}>
              Sign in
            </Link>
          )}
          
          <Link href="/upload" className="bg-[#C8A96E] text-center rounded-full px-4 py-2 hover:bg-[#8B6A2E] transition-colors" onClick={() => setMenuOpen(false)}>
            List a design
          </Link>
        </div>
      )}
    </nav>
  );
}