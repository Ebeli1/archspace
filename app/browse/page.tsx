'use client';
import { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DesignCard from '@/components/cards/DesignCard';
import { createClient } from '@/lib/supabase/client';

export default function BrowsePage() {
  const [designs, setDesigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    async function fetchDesigns() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('designs')
        .select('*')
        .eq('status', 'live');
      
      console.log('Supabase data:', data); // Debug: check what we get
      
      if (!error && data && data.length > 0) {
        // Transform data to match DesignCard expected format
        const formatted = data.map((d: any) => ({
          id: d.id,
          title: d.title,
          description: d.description,
          category: d.category,
          price: d.price,
          licenseType: d.license_type,
          status: d.status,
          coverImage: d.cover_image_url,
          tags: d.tags,
          downloads: d.downloads,
          rating: d.rating,
          reviewCount: d.review_count,
          featured: d.featured,
          designer: {
            name: 'ArchSpace Designer',
            initials: 'AD',
            location: 'Nigeria'
          }
        }));
        console.log('Formatted designs:', formatted); // Debug: check formatted data
        setDesigns(formatted);
      } else {
        console.log('No data or error:', error);
      }
      setLoading(false);
    }
    
    fetchDesigns();
  }, []);

  // Filter by search
  const filtered = designs.filter(d =>
    d.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.tags?.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedDesigns = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="flex items-center gap-1 hover:text-accent">
            <Home size={14} /> Home
          </Link>
          <span>/</span>
          <span className="text-gray-900">Browse designs</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">Browse designs</h1>

        <div className="mb-8">
          <div className="relative max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search designs..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
            />
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Showing {paginatedDesigns.length} of {filtered.length} designs
        </p>

        {paginatedDesigns.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {paginatedDesigns.map((design) => (
                <DesignCard key={design.id} design={design} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="px-4 py-2">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500">No designs found</p>
            <p className="text-xs text-gray-400 mt-2">Debug: Check browser console (F12)</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}