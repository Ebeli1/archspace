'use client';
import Link from 'next/link';
import { Star, Download, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface DesignCardProps {
  design: {
    id: string;
    title: string;
    category: string;
    price: number;
    rating: number;
    reviewCount: number;
    downloads: number;
    coverImage?: string;
    designer: {
      name: string;
    };
  };
}

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

export default function DesignCard({ design }: DesignCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/listing/${design.id}`} className="group block">
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
            {design.coverImage ? (
              <img 
                src={design.coverImage} 
                alt={design.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400 text-sm">No image</span>
              </div>
            )}
            <div className="absolute top-3 left-3">
              <span className={`text-[10px] font-semibold px-2 py-1 rounded-lg ${CATEGORY_COLORS[design.category] || 'bg-gray-100 text-gray-700'}`}>
                {CATEGORY_LABELS[design.category] || design.category}
              </span>
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
          
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-accent transition-colors">
              {design.title}
            </h3>
            <p className="text-xs text-gray-500 mb-2">
              {design.designer?.name || 'Unknown Designer'}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className={i < Math.floor(design.rating || 0) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} />
                  ))}
                </div>
                <span className="text-xs text-gray-600">({design.reviewCount || 0})</span>
              </div>
              <span className="text-sm font-bold text-accent">{formatPrice(design.price || 0)}</span>
            </div>
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100">
              <Download size={11} className="text-gray-400" />
              <span className="text-[11px] text-gray-400">{design.downloads || 0} downloads</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}