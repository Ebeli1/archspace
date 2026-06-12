'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Star, Download, Heart, Shield, Check, Clock, MessageCircle, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { createClient } from '@/lib/supabase/client';

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(price);
}

export default function ListingDetailPage() {
  const params = useParams();
  const designId = params.id as string;
  
  const [design, setDesign] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    async function fetchDesign() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('designs')
        .select(`
          *,
          profiles!seller_id (
            full_name,
            location,
            avatar_url,
            bio
          )
        `)
        .eq('id', designId)
        .single();
      
      if (!error && data) {
        setDesign({
          id: data.id,
          title: data.title,
          description: data.description,
          category: data.category,
          price: data.price,
          licenseType: data.license_type,
          status: data.status,
          coverImage: data.cover_image_url,
          tags: data.tags,
          downloads: data.downloads,
          rating: data.rating,
          reviewCount: data.review_count,
          created_at: data.created_at,
          specs: data.specs || {},
          fileFormats: ['PDF', 'DWG', 'PNG'],
          designer: data.profiles ? {
            name: data.profiles.full_name || 'Designer',
            initials: (data.profiles.full_name || 'AD').charAt(0).toUpperCase(),
            location: data.profiles.location || 'Nigeria',
            avatar: data.profiles.avatar_url,
            bio: data.profiles.bio
          } : {
            name: 'ArchSpace Designer',
            initials: 'AD',
            location: 'Nigeria',
            bio: 'Professional designer with years of experience in Nigerian architecture.'
          }
        });
      }
      setLoading(false);
    }
    
    if (designId) {
      fetchDesign();
    }
  }, [designId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!design) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-semibold mb-2">Design not found</h2>
            <Link href="/browse" className="text-accent hover:underline">
              Browse other designs
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/browse" className="inline-flex items-center gap-2 text-gray-500 hover:text-accent mb-6 transition-colors">
          <ArrowLeft size={16} />
          Back to browse
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
            <img
              src={design.coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop'}
              alt={design.title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  {design.category?.toUpperCase()}
                </span>
                {design.licenseType === 'exclusive' && (
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                    Exclusive
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{design.title}</h1>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className={i < Math.floor(design.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-600">{design.rating}</span>
                  <span className="text-sm text-gray-400">({design.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <Download size={16} />
                  <span className="text-sm">{design.downloads} downloads</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed">{design.description}</p>
            </div>

            {/* Designer Info - Updated with real profile data */}
            <div className="bg-gray-100 rounded-xl p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  {design.designer?.initials || 'AD'}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-lg">{design.designer?.name || 'Unknown Designer'}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    📍 {design.designer?.location || 'Nigeria'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">⭐ {design.rating} rating · {design.downloads} sales</p>
                </div>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <MessageCircle size={14} />
                  Contact
                </button>
              </div>
              {design.designer?.bio && (
                <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-200">
                  {design.designer.bio}
                </p>
              )}
            </div>

            {/* Purchase Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-3xl font-bold text-accent">{formatPrice(design.price)}</p>
                </div>
                <button 
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-2 border border-gray-200 rounded-lg hover:border-accent transition-colors"
                >
                  <Heart size={20} className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
                </button>
              </div>
              
              <button className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-3 rounded-lg transition-colors mb-4">
                Purchase Now
              </button>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Check size={16} className="text-green-500" />
                  <span>Instant download after purchase</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield size={16} className="text-green-500" />
                  <span>Secure payment via Paystack</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={16} className="text-green-500" />
                  <span>24/7 customer support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}