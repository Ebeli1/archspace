export type DesignCategory =
  | 'floor-plan'
  | 'interior-design'
  | '3d-render'
  | 'exterior'
  | 'commercial'
  | 'bim-cad';

export type LicenseType = 'non-exclusive' | 'exclusive';

export type DesignStatus = 'live' | 'draft' | 'sold';

export interface Designer {
  id: string;
  name: string;
  initials: string;
  location: string;
  totalDesigns: number;
  rating: number;
  reviewCount: number;
  bio?: string;
  joinedAt: string;
}

export interface Design {
  id: string;
  title: string;
  description: string;
  category: DesignCategory;
  coverImage?: string;
  price: number;
  licenseType: LicenseType;
  status: DesignStatus;
  fileFormats: string[];
  tags: string[];
  downloads: number;
  rating: number;
  reviewCount: number;
  designer: Designer;
  specs: Record<string, string>;
  createdAt: string;
  featured?: boolean;
}

export interface CartItem {
  designId: string;
  title: string;
  price: number;
  licenseType: LicenseType;
}

export interface FilterOptions {
  category?: DesignCategory | 'all';
  minPrice?: number;
  maxPrice?: number;
  licenseType?: LicenseType | 'all';
  sortBy?: 'newest' | 'popular' | 'price-asc' | 'price-desc';
}