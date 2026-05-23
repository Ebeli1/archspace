'use client';
import Link from 'next/link'
import { Search, ArrowRight, Star, Shield, Zap, Sparkles, TrendingUp, Award, RefreshCw } from 'lucide-react'
import { useRole } from '@/context/RoleContext'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import DesignCard from '@/components/cards/DesignCard'
import { DESIGNS, CATEGORY_LABELS } from '@/lib/data'

export default function HomePage() {
  const { role } = useRole()
  const featuredDesigns = DESIGNS.filter((d) => d.featured)
  const categories = Object.entries(CATEGORY_LABELS).filter(([key]) => key !== 'all')

  return (
    <div className="min-h-screen">
      <Navbar />
      
{/* Hero Section */}
<section className="relative bg-brand overflow-hidden">
  {/* Golden Decorative Circles - Hidden on mobile, visible on larger screens */}
  <div className="hidden md:block absolute top-[-120px] right-[-120px] w-96 h-96 rounded-full border-[60px] border-[#C8A96E]/20 pointer-events-none" />
  <div className="hidden sm:block absolute bottom-[-80px] left-[-80px] w-80 h-80 rounded-full border-[50px] border-[#C8A96E]/15 pointer-events-none" />
  <div className="hidden lg:block absolute top-1/3 right-1/3 w-40 h-40 rounded-full border-[30px] border-[#C8A96E]/10 pointer-events-none" />
  <div className="hidden md:block absolute bottom-1/4 left-1/4 w-24 h-24 rounded-full border-[20px] border-[#C8A96E]/8 pointer-events-none" />
  
  {/* Small circles for mobile - smaller and positioned better */}
  <div className="md:hidden absolute top-[-40px] right-[-40px] w-40 h-40 rounded-full border-[30px] border-[#C8A96E]/15 pointer-events-none" />
  <div className="md:hidden absolute bottom-[-30px] left-[-30px] w-32 h-32 rounded-full border-[25px] border-[#C8A96E]/10 pointer-events-none" />
  
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
    <div className="max-w-2xl mx-auto md:mx-0 text-center md:text-left">
      <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6">
        <Sparkles size={14} className="text-[#C8A96E] sm:size-16" />
        <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-[#C8A96E] uppercase">
          Africa's Premier Design Marketplace
        </span>
      </div>
      
      <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-4">
        <span className="text-white">Buy & Sell</span>
        <br />
        <span className="text-[#C8A96E]">Architectural & Interior Designs</span>
      </h1>
      
      <p className="text-sm sm:text-base lg:text-lg text-white/90 mb-6 sm:mb-8 leading-relaxed max-w-xl mx-auto md:mx-0">
        Discover ready-made floor plans, 3D renders, and interior concepts from 
        Nigeria's top architects and designers. Download instantly.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto md:mx-0 mb-8 sm:mb-10">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 sm:left-4 sm:size-18" />
          <input
            type="text"
            placeholder="Search duplex, living room, 3D render..."
            className="w-full bg-white rounded-xl pl-9 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C8A96E] shadow-lg"
          />
        </div>
        <button className="bg-[#C8A96E] hover:bg-[#8B6A2E] text-white font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-300 text-sm sm:text-base">
          Search
        </button>
      </div>
      
      <div className="flex flex-wrap justify-center md:justify-start gap-6 sm:gap-8">
        <div className="text-center md:text-left">
          <div className="text-xl sm:text-2xl font-bold text-white">2,400+</div>
          <div className="text-xs sm:text-sm text-white/60">Designs listed</div>
        </div>
        <div className="text-center md:text-left">
          <div className="text-xl sm:text-2xl font-bold text-white">680</div>
          <div className="text-xs sm:text-sm text-white/60">Designers</div>
        </div>
        <div className="text-center md:text-left">
          <div className="text-xl sm:text-2xl font-bold text-white">1.2M+</div>
          <div className="text-xs sm:text-sm text-white/60">Paid to sellers</div>
        </div>
      </div>

      {/* Welcome banner for logged in users */}
      {role && (
        <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gradient-to-r from-[#C8A96E]/20 to-[#C8A96E]/10 rounded-xl border border-[#C8A96E]/30">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="text-white font-medium text-sm sm:text-base">Welcome back {role === 'seller' ? 'Seller' : 'Buyer'}! 👋</p>
              <p className="text-white/60 text-xs sm:text-sm">
                {role === 'seller' 
                  ? 'Ready to list a new design? Check your dashboard for earnings.' 
                  : 'Browse through thousands of designs from Nigeria\'s top creators.'}
              </p>
            </div>
            <Link 
              href={role === 'seller' ? '/dashboard' : '/browse'}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#C8A96E] text-white rounded-lg text-xs sm:text-sm hover:bg-[#8B6A2E] transition-colors whitespace-nowrap"
            >
              {role === 'seller' ? 'Go to Dashboard' : 'Start Browsing'}
            </Link>
          </div>
        </div>
      )}

      {/* Sign Up CTA for non-logged in users */}
      {!role && (
        <div className="mt-6 sm:mt-8">
          <Link 
            href="/auth" 
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 sm:px-6 py-1.5 sm:py-2 text-white hover:bg-white/20 transition-all text-sm"
          >
            <span>Join ArchSpace today</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  </div>
</section>

{/* AI Features Banner */}
<section className="bg-gradient-to-r from-brand-light to-brand border-y border-white/5">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="flex items-center gap-2 mb-5">
      <Sparkles size={16} className="text-accent" />
      <span className="text-white text-sm font-medium">New: AI-powered design features</span>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[
        { href: '/ai/studio', icon: <Sparkles size={18} />, title: 'AI Design Studio', desc: 'Describe your dream space. Get a professional design brief through conversation.' },
        { href: '/ai/remodel', icon: <RefreshCw size={18} />, title: 'Remodel Assistant', desc: 'Upload your existing floor plan. Get expert suggestions on what to change.' },
        { href: '/ai/advisor', icon: <Search size={18} />, title: 'Design Advisor', desc: 'Tell me your needs. I\'ll find the best matching designs from our catalogue.' },
      ].map(f => (
        <Link key={f.href} href={f.href} className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/40 rounded-xl p-5 transition-all">
          <div className="text-accent mb-3">{f.icon}</div>
          <h3 className="text-white font-medium text-sm mb-1">{f.title}</h3>
          <p className="text-white/50 text-xs leading-relaxed mb-3">{f.desc}</p>
          <span className="text-accent text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
            Try it free <ArrowRight size={11} />
          </span>
        </Link>
      ))}
    </div>
  </div>
</section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-2 flex-wrap justify-center">
          <Link href="/browse" className="px-4 py-2 rounded-full text-sm border border-gray-200 bg-white text-gray-700 hover:border-[#C8A96E] hover:text-[#C8A96E] transition-colors">
            All designs
          </Link>
          {categories.map(([key, label]) => (
            <Link
              key={key}
              href={`/browse?category=${key}`}
              className="px-4 py-2 rounded-full text-sm border border-gray-200 bg-white text-gray-700 hover:border-[#C8A96E] hover:text-[#C8A96E] transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Featured designs</h2>
          <Link href="/browse" className="flex items-center gap-1 text-sm text-[#C8A96E] hover:text-[#8B6A2E]">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredDesigns.map((design) => (
            <DesignCard key={design.id} design={design} />
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-2">Why ArchSpace?</h2>
            <p className="text-gray-500 text-sm">Built for Nigerian architects, designers, and buyers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#C8A96E]/10 flex items-center justify-center mx-auto mb-4">
                <Zap size={22} className="text-[#C8A96E]" />
              </div>
              <h3 className="font-semibold mb-2">Instant downloads</h3>
              <p className="text-sm text-gray-500">Purchase and download immediately.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#C8A96E]/10 flex items-center justify-center mx-auto mb-4">
                <Shield size={22} className="text-[#C8A96E]" />
              </div>
              <h3 className="font-semibold mb-2">Secure payments</h3>
              <p className="text-sm text-gray-500">Protected by Paystack.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#C8A96E]/10 flex items-center justify-center mx-auto mb-4">
                <Award size={22} className="text-[#C8A96E]" />
              </div>
              <h3 className="font-semibold mb-2">Curated quality</h3>
              <p className="text-sm text-gray-500">Every design is reviewed.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1A1A2E] py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <TrendingUp size={32} className="text-[#C8A96E] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">Are you an architect or designer?</h2>
          <p className="text-white/70 mb-8">
            List your designs. You earn <span className="text-[#C8A96E] font-bold">80%</span> of every sale.
          </p>
          <Link href="/upload" className="inline-flex items-center gap-2 bg-[#C8A96E] hover:bg-[#8B6A2E] text-white font-semibold px-8 py-3 rounded-lg transition-colors">
            Start selling <ArrowRight size={16} />
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}