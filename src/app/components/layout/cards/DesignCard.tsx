import Link from 'next/link';
import { Star, Download } from 'lucide-react';
import type { Design } from '@/types';
import { formatPrice, cn } from '@/lib/utils';

const CATEGORY_COLORS: Record<string, string> = {
  'floor-plan': 'bg-blue-50 text-blue-700',
  'interior-design': 'bg-purple-50 text-purple-700',
  '3d-render': 'bg-amber-50 text-amber-700',
  exterior: 'bg-green-50 text-green-700',
  commercial: 'bg-gray-100 text-gray-700',
  'bim-cad': 'bg-red-50 text-red-700',
};

const CATEGORY_LABELS: Record<string, string> = {
  'floor-plan': 'Floor plan',
  'interior-design': 'Interior design',
  '3d-render': '3D render',
  exterior: 'Exterior',
  commercial: 'Commercial',
  'bim-cad': 'BIM / CAD',
};

interface DesignCardProps {
  design: Design;
  className?: string;
}

export default function DesignCard({ design, className }: DesignCardProps) {
  return (
    <Link href={`/listing/${design.id}`} className={cn('group block', className)}>
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-accent/40 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
        <div className="relative h-44 bg-brand overflow-hidden">
          <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(200,169,110,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.8) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />
            <svg width="100" height="80" viewBox="0 0 100 80" fill="none" className="relative z-10">
              {design.category === 'floor-plan' && (
                <>
                  <rect x="6" y="20" width="40" height="50" stroke="rgba(200,169,110,0.7)" strokeWidth="1.2" fill="none" />
                  <rect x="46" y="10" width="48" height="60" stroke="rgba(200,169,110,0.7)" strokeWidth="1.2" fill="none" />
                  <rect x="46" y="10" width="22" height="28" stroke="rgba(200,169,110,0.4)" strokeWidth="0.7" fill="rgba(200,169,110,0.06)" />
                  <line x1="6" y1="45" x2="46" y2="45" stroke="rgba(200,169,110,0.35)" strokeWidth="0.7" />
                </>
              )}
            </svg>
          </div>
          <div className="absolute top-2.5 left-2.5 flex gap-1.5">
            <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full', CATEGORY_COLORS[design.category])}>
              {CATEGORY_LABELS[design.category]}
            </span>
            {design.downloads > 100 && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-accent text-white">Bestseller</span>
            )}
            {design.licenseType === 'exclusive' && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-brand text-white">Exclusive</span>
            )}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-1 leading-snug line-clamp-2 group-hover:text-brand transition-colors">
            {design.title}
          </h3>
          <p className="text-xs text-gray-500 mb-3">
            {design.designer.name} · {design.designer.location}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star size={12} className="text-amber-400 fill-amber-400" />
              <span className="text-xs text-gray-600 font-medium">{design.rating.toFixed(1)}</span>
              <span className="text-xs text-gray-400">({design.reviewCount})</span>
            </div>
            <span className="text-sm font-semibold text-accent">{formatPrice(design.price)}</span>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <Download size={11} className="text-gray-300" />
            <span className="text-[11px] text-gray-400">{design.downloads}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}