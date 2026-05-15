'use client';
import Link from 'next/link';
import { Star } from 'lucide-react';
import Image from 'next/image';
import type { Design } from '../../types';
import { formatPrice } from '../../lib/utils';

const CATEGORY_LABELS: Record<string, string> = {
  'floor-plan': 'FLOOR PLAN',
  'interior-design': 'INTERIOR DESIGN',
  '3d-render': '3D RENDER',
  exterior: 'EXTERIOR',
  commercial: 'COMMERCIAL',
  'bim-cad': 'BIM / CAD',
};

const CATEGORY_BG: Record<string, string> = {
  'floor-plan': 'bg-blue-100 text-blue-700',
  'interior-design': 'bg-purple-100 text-purple-700',
  '3d-render': 'bg-amber-100 text-amber-700',
  exterior: 'bg-green-100 text-green-700',
  commercial: 'bg-gray-100 text-gray-700',
  'bim-cad': 'bg-red-100 text-red-700',
};

// Placeholder images from Unsplash (free, high-quality)
const PLACEHOLDER_IMAGES: Record<string, string> = {
  'floor-plan': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop',
  'interior-design': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=300&fit=crop',
  '3d-render': 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&h=300&fit=crop',
  exterior: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=400&h=300&fit=crop',
  commercial: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
  'bim-cad': 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=300&fit=crop',
};

interface DesignCardProps {
  design: Design;
  className?: string;
}

export default function DesignCard({ design, className }: DesignCardProps) {
  const imageUrl = design.coverImage || PLACEHOLDER_IMAGES[design.category] || PLACEHOLDER_IMAGES['floor-plan'];
  
  return (
    <Link href={`/listing/${design.id}`} className={`group block ${className || ''}`}>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-40 overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={design.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2">
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${CATEGORY_BG[design.category]}`}>
              {CATEGORY_LABELS[design.category]}
            </span>
          </div>
          {design.downloads > 100 && (
            <div className="absolute top-2 right-2">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-accent text-white">
                Bestseller
              </span>
            </div>
          )}
          {design.licenseType === 'exclusive' && (
            <div className="absolute bottom-2 left-2">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-black/70 text-white">
                Exclusive
              </span>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
            {design.title}
          </h3>
          <p className="text-xs text-gray-500">
            {design.designer.name}
          </p>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className={i < Math.floor(design.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} />
                ))}
              </div>
              <span className="text-xs text-gray-600">{design.rating.toFixed(1)}</span>
              <span className="text-xs text-gray-400">({design.reviewCount})</span>
            </div>
            <span className="text-sm font-bold text-accent">{formatPrice(design.price)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
