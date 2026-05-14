import Link from 'next/link';
import { Search, ArrowRight, Star, Shield, Zap } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DesignCard from '@/components/cards/DesignCard';
import { DESIGNS, CATEGORY_LABELS } from '@/lib/data';

export default function HomePage() {
  const featuredDesigns = DESIGNS.filter((d) => d.featured);
  const categories = Object.entries(CATEGORY_LABELS).filter(([key]) => key !== 'all');

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* HERO */}
      <section className="bg-brand relative overflow-hidden">
        <div className="absolute top-[-80px] right-[-80px] w-80 h-80 rounded-full border-[50px] border-accent/10 pointer-events-none" />
        <div className="absolute bottom-[-50px] left-[60px] w-52 h-52 rounded-full border-[35px] border-accent/6 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-accent bg-accent/10 px-3 py-1.5 rounded-full mb-5">
              Africa's design marketplace
            </span>
            <h1 className="text-4xl sm:text-5xl font-semibold text-white leading-tight mb-5 text-balance">
              Buy & sell architectural and interior designs
            </h1>
            <p className="text-white/55 text-lg mb-8 leading-relaxed max-w-xl">
              Discover ready-made floor plans, 3D renders, and interior concepts from Nigeria's top architects and designers.
            </p>
            <form action="/browse" method="GET" className="flex gap-3 max-w-lg mb-10">
              <div className="flex-1 relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  name="q"
                  type="text"
                  placeholder="Search duplex, living room, 3D render..."
                  className="w-full bg-white/10 border border-white/15 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-white/35 text-sm focus:outline-none focus:border-accent/60 transition-colors"
                />
              </div>
              <button type="submit" className="bg-accent hover:bg-accent-dark text-white font-medium px-6 rounded-lg text-sm transition-colors whitespace-nowrap">
                Search
              </button>
            </form>
            <div className="flex flex-wrap gap-8">
              {[
                { num: '2,400+', lbl: 'Designs listed' },
                { num: '680', lbl: 'Designers' },
                { num: '1.2M+', lbl: 'Paid to sellers' },
              ].map((s) => (
                <div key={s.lbl}>
                  <div className="text-2xl font-semibold text-white">{s.num}</div>
                  <div className="text-xs text-white/45">{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-3 flex-wrap">
          <Link href="/browse" className="px-4 py-2 rounded-full text-sm border border-gray-200 bg-white text-gray-700 hover:border-accent hover:text-accent transition-colors">
            All designs
          </Link>
          {categories.map(([key, label]) => (
            <Link key={key} href={`/browse?category=${key}`} className="px-4 py-2 rounded-full text-sm border border-gray-200 bg-white text-gray-700 hover:border-accent hover:text-accent transition-colors">
              {label}
            </Link>
          ))}
        </div>
      </section>
      {/* FEATURED DESIGNS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Featured designs</h2>
          <Link href="/browse" className="flex items-center gap-1.5 text-sm text-accent hover:text-accent-dark font-medium transition-colors">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredDesigns.map((d) => (
            <DesignCard key={d.id} design={d} />
          ))}
        </div>
      </section>
      {/* VALUE PROPS */}
      <section className="bg-white border-y border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold mb-2">Why ArchSpace?</h2>
            <p className="text-gray-500 text-sm">Built for Nigerian architects, designers, and buyers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Zap size={22} className="text-accent" />, title: 'Instant downloads', desc: 'Purchase and download your design files immediately. No waiting for a designer to respond.' },
              { icon: <Shield size={22} className="text-accent" />, title: 'Secure payments', desc: 'All transactions are processed through Paystack with full buyer and seller protection.' },
              { icon: <Star size={22} className="text-accent" />, title: 'Curated quality', desc: 'Every design is reviewed before listing. You get professional-grade files, every time.' },
            ].map((v) => (
              <div key={v.title} className="text-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">{v.icon}</div>
                <h3 className="font-medium mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* SELLER CTA */}
      <section className="bg-brand py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold text-white mb-3">Are you an architect or designer?</h2>
          <p className="text-white/55 mb-8 leading-relaxed">
            List your floor plans, renders, and design concepts. You earn 80% of every sale, keep full copyright, and reach thousands of buyers across Nigeria.
          </p>
          <Link href="/upload" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-medium px-8 py-3.5 rounded-lg transition-colors">
            Start selling <ArrowRight size={16} />
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}