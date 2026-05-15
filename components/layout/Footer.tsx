import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A2E] text-white/60 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="text-xl font-semibold text-white mb-3">
              Arch<span className="text-[#C8A96E]">Space</span>
            </div>
            <p className="text-sm leading-relaxed">
              Africa's marketplace for architectural and interior design files.
            </p>
          </div>
          <div>
            <p className="text-white font-medium text-sm mb-3">Marketplace</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/browse" className="hover:text-white transition-colors">Browse designs</Link></li>
              <li><Link href="/browse?category=floor-plan" className="hover:text-white transition-colors">Floor plans</Link></li>
              <li><Link href="/browse?category=interior-design" className="hover:text-white transition-colors">Interior design</Link></li>
              <li><Link href="/browse?category=3d-render" className="hover:text-white transition-colors">3D renders</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-white font-medium text-sm mb-3">Sellers</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/upload" className="hover:text-white transition-colors">List a design</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-white font-medium text-sm mb-3">Company</p>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of use</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs">© 2025 ArchSpace. Built in Nigeria</p>
          <p className="text-xs">Payments secured by Paystack</p>
        </div>
      </div>
    </footer>
  );
}
