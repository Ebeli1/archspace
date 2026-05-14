import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Star, Heart, MessageCircle, Shield, FileText, Check } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DesignCard from '@/components/cards/DesignCard';
import { DESIGNS } from '@/lib/data';
import { formatPrice } from '@/lib/utils';

interface PageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return DESIGNS.map((d) => ({ id: d.id }));
}

export default function ListingPage({ params }: PageProps) {
  const design = DESIGNS.find((d) => d.id === params.id);
  if (!design) notFound();

  const related = DESIGNS.filter((d) => d.id !== design.id && d.category === design.category).slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/browse" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors">
          <ArrowLeft size={14} /> Back to browse
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left */}
          <div className="lg:col-span-2">
            <div className="relative h-72 sm:h-96 bg-brand rounded-2xl overflow-hidden mb-6">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(200,169,110,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.7) 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center relative z-10 px-6">
                <p className="text-[11px] text-accent/80 tracking-widest uppercase mb-3">
                  {design.category.replace(/-/g, ' ')} · {design.fileFormats.join(', ')}
                </p>
                <h1 className="text-2xl sm:text-3xl text-white font-semibold leading-tight">{design.title}</h1>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {design.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs border border-gray-200 text-gray-600 bg-white">
                  {tag}
                </span>
              ))}
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
              <h2 className="font-medium mb-3">About this design</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{design.description}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
              <h2 className="font-medium mb-4">Design specifications</h2>
              <div className="divide-y divide-gray-50">
                {Object.entries(design.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between py-3 text-sm">
                    <span className="text-gray-500">{key}</span>
                    <span className="font-medium text-gray-900">{val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="font-medium mb-4">Included files</h2>
              <div className="flex flex-wrap gap-3">
                {design.fileFormats.map((fmt) => (
                  <div key={fmt} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-gray-100">
                    <FileText size={14} className="text-accent" />
                    <span className="text-sm font-medium">{fmt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Right panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-3xl font-semibold text-accent">{formatPrice(design.price)}</span>
                  <span className="text-xs text-gray-400 capitalize">{design.licenseType.replace('-', ' ')} license</span>
                </div>
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        className={i < Math.round(design.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{design.rating.toFixed(1)}</span>
                  <span className="text-xs text-gray-400">({design.reviewCount} reviews)</span>
                </div>
                <button className="w-full bg-brand hover:bg-brand-light text-white font-medium py-3.5 rounded-lg transition-colors mb-3 text-sm">
                  Purchase — {formatPrice(design.price)}
                </button>
                <button className="w-full border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
                  <Heart size={15} /> Save to wishlist
                </button>
                <div className="mt-4 space-y-2">
                  {[
                    'Instant download after purchase',
                    'Full file access included',
                    'Secure payment via Paystack',
                  ].map((t) => (
                    <div key={t} className="flex items-center gap-2 text-xs text-gray-500">
                      <Check size={12} className="text-green-500 flex-shrink-0" /> {t}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-full bg-brand flex items-center justify-center text-accent font-medium text-sm flex-shrink-0">
                    {design.designer.initials}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{design.designer.name}</p>
                    <p className="text-xs text-gray-400">
                      {design.designer.location} · {design.designer.totalDesigns} designs · ★ {design.designer.rating}
                    </p>
                  </div>
                </div>
                {design.designer.bio && <p className="text-xs text-gray-500 mb-3 leading-relaxed">{design.designer.bio}</p>}
                <button className="w-full border border-gray-200 hover:bg-gray-50 text-gray-700 py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors">
                  <MessageCircle size={14} /> Message designer
                </button>
              </div>
              <div className="flex items-center gap-2 px-4 py-3 bg-green-50 rounded-lg border border-green-100">
                <Shield size={15} className="text-green-600 flex-shrink-0" />
                <span className="text-xs text-green-700">Protected by ArchSpace buyer guarantee</span>
              </div>
            </div>
          </div>
        </div>
        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="text-xl font-semibold mb-6">More like this</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((d) => (
                <DesignCard key={d.id} design={d} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}