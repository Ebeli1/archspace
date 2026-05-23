import AIChat from '@/components/ai/AIChat';
import Navbar from '@/components/layout/Navbar';
import { Search, Star, ShoppingBag, Zap, Compass, TrendingUp } from 'lucide-react';

const WELCOME_MESSAGE = `Hello! I'm your ArchSpace Design Advisor.

Instead of scrolling through hundreds of listings, just tell me what you're looking for — your project, style preferences, location in Nigeria, and budget. I'll find the best matches from our catalogue and explain exactly why each one fits your needs.

**What are you working on?**`;

const SUGGESTIONS = [
  'Looking for a duplex floor plan under ₦50k',
  'Need interior design for my Abuja apartment',
  'Contemporary 3-bed plan, Port Harcourt area',
  'Commercial office layout for 30 staff',
  'Luxury master bedroom concept',
];

export default function AIAdvisorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col lg:flex-row gap-6">
        <aside className="lg:w-72 flex-shrink-0">
          <div className="sticky top-24 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Search size={16} className="text-accent" />
                <h1 className="font-semibold text-base">Design Advisor</h1>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Skip the scroll. Tell me what you need and I'll find the right designs from our catalogue — with reasons why each one fits.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">What I can help with</p>
              <div className="flex items-center gap-2.5 text-sm text-gray-600">
                <ShoppingBag size={14} className="text-accent" />
                Find designs that match your brief
              </div>
              <div className="flex items-center gap-2.5 text-sm text-gray-600">
                <Star size={14} className="text-accent" />
                Compare styles and prices
              </div>
              <div className="flex items-center gap-2.5 text-sm text-gray-600">
                <Zap size={14} className="text-accent" />
                Explain what's included in each file
              </div>
              <div className="flex items-center gap-2.5 text-sm text-gray-600">
                <Compass size={14} className="text-accent" />
                Advise on buy vs commission
              </div>
            </div>

            <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
              <p className="text-xs font-semibold text-accent-dark mb-2">🇳🇬 Nigeria-aware</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                I factor in your city, local material costs, and Nigerian building conventions when making recommendations.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Current catalogue</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 rounded-lg p-2 text-center">
                  <p className="font-semibold text-sm">10+</p>
                  <p className="text-[11px] text-gray-400">Designs</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 text-center">
                  <p className="font-semibold text-sm">4</p>
                  <p className="text-[11px] text-gray-400">Designers</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 text-center">
                  <p className="font-semibold text-sm">₦18.5k</p>
                  <p className="text-[11px] text-gray-400">Avg price</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 text-center">
                  <p className="font-semibold text-sm">4.7</p>
                  <p className="text-[11px] text-gray-400">Avg rating</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1 bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col" style={{ minHeight: '600px' }}>
          <AIChat
            feature="advisor"
            welcomeMessage={WELCOME_MESSAGE}
            suggestions={SUGGESTIONS}
            placeholder="Tell me what you're looking for..."
          />
        </div>
      </div>
    </div>
  );
}