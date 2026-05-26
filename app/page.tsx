'use client';
import Link from 'next/link';
import { Search, ArrowRight, Star, Shield, Zap, Sparkles, TrendingUp, Award } from 'lucide-react';
import { useRole } from '@/context/RoleContext';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DesignCard from '@/components/cards/DesignCard';
import { DESIGNS, CATEGORY_LABELS } from '@/lib/data';
import { AnimatedSection, AnimatedCard } from '@/components/AnimatedSection';

export default function HomePage() {
  const { role } = useRole();
  const featuredDesigns = DESIGNS.filter((d) => d.featured);
  const categories = Object.entries(CATEGORY_LABELS).filter(([key]) => key !== 'all');

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section with Parallax Effect */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#1A1A2E] via-[#1A1A2E] to-[#2D2D4E] overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-accent/20 to-transparent animate-pulse-slow" />
          <div className="absolute bottom-[-200px] left-[-200px] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-accent/10 to-transparent animate-float" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-accent/5 animate-pulse-slow" />
          
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-accent/30 rounded-full animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-accent/30 rounded-full px-4 py-2 mb-6"
            >
              <Sparkles size={16} className="text-accent animate-pulse" />
              <span className="text-xs font-semibold tracking-wider text-accent uppercase">
                Africa's Premier Design Marketplace
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            >
              <span className="text-white">Buy & Sell</span>
              <br />
              <span className="gradient-text">Architectural & Interior Designs</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-base sm:text-lg text-white/80 mb-8 leading-relaxed max-w-2xl mx-auto"
            >
              Discover ready-made floor plans, 3D renders, and interior concepts from 
              Nigeria's top architects and designers. Download instantly.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-10"
            >
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search duplex, living room, 3D render..."
                  className="w-full bg-white rounded-xl pl-12 pr-4 py-3 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-accent shadow-lg transition-all duration-300"
                />
              </div>
              <button className="bg-gradient-to-r from-accent to-accent-dark hover:shadow-lg hover:shadow-accent/30 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105">
                Search
              </button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center gap-8"
            >
              {[
                { num: '2,400+', label: 'Designs listed' },
                { num: '680', label: 'Designers' },
                { num: '1.2M+', label: 'Paid to sellers' },
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.9 + idx * 0.1, type: "spring" }}
                  className="text-center"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-white">{stat.num}</div>
                  <div className="text-xs sm:text-sm text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Welcome Banner */}
            {role && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-10 p-5 bg-gradient-to-r from-accent/20 to-accent/10 backdrop-blur-sm rounded-2xl border border-accent/30"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-white font-semibold text-lg">Welcome back, {role === 'seller' ? 'Seller' : 'Buyer'}! 👋</p>
                    <p className="text-white/70 text-sm">
                      {role === 'seller' 
                        ? 'Ready to list a new design? Check your dashboard for earnings.' 
                        : 'Browse through thousands of designs from Nigeria\'s top creators.'}
                    </p>
                  </div>
                  <Link href={role === 'seller' ? '/dashboard' : '/browse'}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-2 bg-accent text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all"
                    >
                      {role === 'seller' ? 'Go to Dashboard' : 'Start Browsing'}
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            )}

            {/* Sign Up CTA */}
            {!role && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-10"
              >
                <Link href="/auth">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 text-white hover:bg-white/20 transition-all"
                  >
                    <span>Join ArchSpace today</span>
                    <ArrowRight size={14} />
                  </motion.button>
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-3 flex-wrap justify-center">
          <Link href="/browse" className="px-5 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-brand to-brand-light text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            All designs
          </Link>
          {categories.map(([key, label]) => (
            <Link
              key={key}
              href={`/browse?category=${key}`}
              className="px-5 py-2.5 rounded-full text-sm font-medium bg-white text-gray-700 border border-gray-200 hover:border-accent hover:text-accent hover:shadow-md transition-all duration-300 transform hover:scale-105"
            >
              {label}
            </Link>
          ))}
        </div>
      </AnimatedSection>

      {/* Featured Designs Section */}
      <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-brand">Featured Designs</h2>
            <p className="text-gray-500 mt-1">Curated picks from Nigeria's best designers</p>
          </div>
          <Link href="/browse" className="group flex items-center gap-2 text-accent hover:text-accent-dark font-medium transition-all duration-300">
            View all 
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDesigns.map((design, idx) => (
            <motion.div
              key={design.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <DesignCard design={design} />
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* Why ArchSpace Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-3xl font-bold text-brand mt-2">Why ArchSpace?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Built for Nigerian architects, designers, and buyers</p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'Instant Downloads', desc: 'Purchase and download your design files immediately. No waiting for designer response.', delay: 0 },
              { icon: Shield, title: 'Secure Payments', desc: 'All transactions protected by Paystack with full buyer and seller guarantee.', delay: 0.1 },
              { icon: Award, title: 'Curated Quality', desc: 'Every design is reviewed before listing. Professional-grade files guaranteed.', delay: 0.2 },
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mx-auto mb-5">
                  <feature.icon size={28} className="text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seller CTA */}
      <section className="bg-gradient-to-r from-brand via-brand-light to-brand py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" />
        
        <div className="relative max-w-3xl mx-auto px-4 text-center z-10">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
          >
            <TrendingUp size={48} className="text-accent mx-auto mb-4" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-4">Are you an architect or designer?</h2>
          <p className="text-white/70 mb-8 leading-relaxed text-lg">
            List your designs. You earn <span className="text-accent font-bold text-2xl">80%</span> of every sale.
          </p>
          <Link href="/upload">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-accent-dark hover:shadow-lg hover:shadow-accent/30 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300"
            >
              Start Selling Today <ArrowRight size={18} />
            </motion.button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}