'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, ShoppingBag, LayoutGrid, Eye, 
  DollarSign, ArrowRight, Plus, Settings, LogOut, Download
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { DESIGNS, DESIGNERS } from '@/lib/data';

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(price);
}

export default function DashboardContent() {
  const [seller, setSeller] = useState<any>(null);
  const [sellerDesigns, setSellerDesigns] = useState<any[]>([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [pendingEarnings, setPendingEarnings] = useState(0);

  useEffect(() => {
    const currentSeller = DESIGNERS[0];
    setSeller(currentSeller);
    
    const designs = DESIGNS.filter(d => d.designer.id === currentSeller.id);
    setSellerDesigns(designs);
    
    const total = designs.reduce((sum, d) => sum + (d.price * 0.8), 0);
    setTotalEarnings(total);
    setPendingEarnings(total * 0.3);
  }, []);

  const stats = [
    { label: 'Total Revenue', value: formatPrice(totalEarnings), change: '+18%', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Total Sales', value: sellerDesigns.reduce((sum, d) => sum + d.downloads, 0).toString(), change: '+12%', icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Active Listings', value: sellerDesigns.filter(d => d.status === 'live').length.toString(), change: '+2', icon: LayoutGrid, color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Profile Views', value: '1,247', change: '+23%', icon: Eye, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  const recentActivity = [
    { message: 'Modern 4-bedroom duplex was purchased', amount: 45000, time: '2 hours ago', icon: TrendingUp },
    { message: 'Luxury living room concept was viewed 14 times', amount: null, time: '4 hours ago', icon: Eye },
    { message: '3-bedroom terrace house plan was downloaded', amount: null, time: 'Yesterday', icon: Download },
  ];

  const statusStyles: Record<string, string> = {
    live: 'bg-green-100 text-green-700',
    draft: 'bg-gray-100 text-gray-600',
    sold: 'bg-amber-100 text-amber-700',
  };

  if (!seller) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back, {seller.name.split(' ')[0]}!</p>
          </div>
          <Link href="/upload" className="mt-4 sm:mt-0 inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-semibold px-4 py-2 rounded-lg transition-colors">
            <Plus size={18} /> List New Design
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                  <stat.icon size={24} className={stat.color} />
                </div>
                <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Your Listings</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr><th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Design</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Price</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Sales</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sellerDesigns.map((design) => (
                    <tr key={design.id} className="border-t border-gray-200">
                      <td className="px-6 py-4">
                        <Link href={`/listing/${design.id}`} className="text-sm font-medium text-gray-900 hover:text-accent">
                          {design.title}
                        </Link>
                       </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{formatPrice(design.price)}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{design.downloads}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[design.status]}`}>
                          {design.status}
                        </span>
                       </td>
                     </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="p-4 flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <activity.icon size={16} className="text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    {activity.amount && <p className="text-sm font-semibold text-green-600 mt-1">{formatPrice(activity.amount)}</p>}
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-brand to-brand-light rounded-xl p-6 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-white/70 text-sm">Available for payout</p>
              <p className="text-3xl font-bold mt-1">{formatPrice(pendingEarnings)}</p>
            </div>
            <div className="flex gap-3 mt-4 sm:mt-0">
              <button className="px-6 py-2 bg-white text-brand rounded-lg font-semibold hover:bg-gray-100">Withdraw Funds</button>
              <button className="px-6 py-2 border border-white/30 rounded-lg font-semibold hover:bg-white/10">View History</button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}