import Link from 'next/link'
import { Search, ArrowRight, Star, Shield, Zap, Sparkles, TrendingUp, Award } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import DesignCard from '../components/cards/DesignCard'
import { DESIGNS, CATEGORY_LABELS } from '../lib/data'

export default function HomePage() {
  const featuredDesigns = DESIGNS.filter((d) => d.featured)
  const categories = Object.entries(CATEGORY_LABELS).filter(([key]) => key !== 'all')

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section with Left-aligned Text and Decorative Circles */}
      <section className="relative bg-brand overflow-hidden">
        {/* Decorative Circles - Larger and Gold */}
        <div className="absolute top-[-120px] right-[-120px] w-96 h-96 rounded-full border-[60px] border-accent/15 pointer-events-none" />
        <div className="absolute bottom-[-80px] left-[-80px] w-80 h-80 rounded-full border-[50px] border-accent/10 pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full border-[30px] border-accent/8 pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles size={16} className="text-accent" />
              <span className="text-xs font-semibold tracking-wider text-accent uppercase">
                Africa's Premier Design Marketplace
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-4">
              <span className="text-white">Buy & Sell</span>
              <br />
              <span className="text-accent">Architectural & Interior Designs</span>
            </h1>
            
            <p className="text-base sm:text-lg text-white/90 mb-8 leading-relaxed max-w-xl">
              Discover ready-made floor plans, 3D renders, and interior concepts from 
              Nigeria's top architects and designers. Download instantly.
            </p>
            
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mb-10">
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search duplex, living room, 3D render..."
                  className="w-full bg-white rounded-xl pl-12 pr-4 py-3 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-accent shadow-lg"
                />
              </div>
              <button className="bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                Search
              </button>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              <div>
                <div className="text-2xl font-bold text-white">2,400+</div>
                <div className="text-sm text-white/60">Designs listed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">680</div>
                <div className="text-sm text-white/60">Designers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">1.2M+</div>
                <div className="text-sm text-white/60">Paid to sellers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-2 flex-wrap justify-center">
          <Link href="/browse" className="px-4 py-2 rounded-full text-sm border border-gray-200 bg-white text-gray-700 hover:border-accent hover:text-accent transition-colors">
            All designs
          </Link>
          {categories.map(([key, label]) => (
            <Link
              key={key}
              href={`/browse?category=${key}`}
              className="px-4 py-2 rounded-full text-sm border border-gray-200 bg-white text-gray-700 hover:border-accent hover:text-accent transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Designs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Featured designs</h2>
          <Link href="/browse" className="flex items-center gap-1 text-sm text-accent hover:text-accent-dark">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredDesigns.map((design) => (
            <DesignCard key={design.id} design={design} />
          ))}
        </div>
      </section>

      {/* Why ArchSpace */}
      <section className="bg-white border-y border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-brand mb-2">Why ArchSpace?</h2>
            <p className="text-gray-500 text-sm">Built for Nigerian architects, designers, and buyers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Zap size={22} className="text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Instant downloads</h3>
              <p className="text-sm text-gray-500">Purchase and download your design files immediately.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Shield size={22} className="text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Secure payments</h3>
              <p className="text-sm text-gray-500">Protected by Paystack with buyer guarantee.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Award size={22} className="text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Curated quality</h3>
              <p className="text-sm text-gray-500">Every design is reviewed before listing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seller CTA */}
      <section className="bg-brand py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <TrendingUp size={32} className="text-accent mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">Are you an architect or designer?</h2>
          <p className="text-white/70 mb-8">
            List your floor plans, renders, and design concepts. You earn <span className="text-accent font-bold">80%</span> of every sale.
          </p>
          <Link href="/upload" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors">
            Start selling <ArrowRight size={16} />
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}
