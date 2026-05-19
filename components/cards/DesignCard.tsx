'use client';
import Link from 'next/link';
import { Star, Download } from 'lucide-react';

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(price);
}

const CATEGORY_COLORS: Record<string, string> = {
  'floor-plan': 'bg-blue-100 text-blue-700',
  'interior-design': 'bg-purple-100 text-purple-700',
  '3d-render': 'bg-amber-100 text-amber-700',
  exterior: 'bg-green-100 text-green-700',
  commercial: 'bg-gray-100 text-gray-700',
  'bim-cad': 'bg-red-100 text-red-700',
};

const CATEGORY_LABELS: Record<string, string> = {
  'floor-plan': 'FLOOR PLAN',
  'interior-design': 'INTERIOR DESIGN',
  '3d-render': '3D RENDER',
  exterior: 'EXTERIOR',
  commercial: 'COMMERCIAL',
  'bim-cad': 'BIM / CAD',
};

export default function DesignCard({ design }) {
  return (
    <Link href={`/listing/${design.id}`} className="group block">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
        <div className="relative h-40 overflow-hidden bg-gray-100">
          {design.coverImage ? (
            <img 
              src={design.coverImage} 
              alt={design.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <span className="text-gray-400 text-sm">No image</span>
            </div>
          )}
          <div className="absolute top-2 left-2">
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${CATEGORY_COLORS[design.category] || 'bg-gray-100 text-gray-700'}`}>
              {CATEGORY_LABELS[design.category] || design.category}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
            {design.title}
          </h3>
          <p className="text-xs text-gray-500">
            {design.designer?.name || 'Unknown Designer'}
          </p>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className={i < Math.floor(design.rating || 0) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} />
                ))}
              </div>
              <span className="text-xs text-gray-600">{(design.rating || 0).toFixed(1)}</span>
              <span className="text-xs text-gray-400">({design.reviewCount || 0})</span>
            </div>
            <span className="text-sm font-bold text-[#C8A96E]">{formatPrice(design.price || 0)}</span>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <Download size={11} className="text-gray-300" />
            <span className="text-[11px] text-gray-400">{design.downloads || 0}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
