import Link from 'next/link';
import { TrendingUp, ShoppingBag, LayoutGrid, Eye, Plus, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { DESIGNS, DESIGNERS } from '@/lib/data';
import { formatPrice } from '@/lib/utils';

const seller = DESIGNERS[0];

const ACTIVITY = [
  { type: 'sale', text: 'New sale - Modern 4-bed duplex', amount: '45,000', time: '2 hours ago', color: 'bg-green-500' },
  { type: 'view', text: 'Luxury living room concept was viewed 14 times', amount: null, time: '4 hours ago', color: 'bg-accent' },
  { type: 'message', text: 'Message from Emeka O. about 3-bed terrace', amount: null, time: 'Yesterday', color: 'bg-blue-500' },
  { type: 'sale', text: 'New sale - Luxury living room concept', amount: '28,000', time: 'Yesterday', color: 'bg-green-500' },
  { type: 'view', text: 'Contemporary bungalow facade was viewed 8 times', amount: null, time: '2 days ago', color: 'bg-accent' },
];

const STATUS_STYLE: Record<string, string> = {
  live: 'bg-green-50 text-green-700',
  draft: 'bg-gray-100 text-gray-600',
  sold: 'bg-accent/10 text-accent-dark',
};

export default function DashboardPage() {
  const sellerDesigns = DESIGNS.filter((d) => d.designer.id === seller.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold">Good morning, {seller.name.split(' ')[0]} 👋</h1>
            <p className="text-gray-500 text-sm mt-1">Here's how your designs are performing this month.</p>
          </div>
          <Link href="/upload" className="btn-accent flex items-center gap-2 text-sm">
            <Plus size={15} /> New listing
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Revenue this month', value: '₦312,000', sub: '↑ 18% vs last month', icon: <TrendingUp size={18} />, color: 'text-green-600' },
            { label: 'Total sales', value: '47', sub: '9 this week', icon: <ShoppingBag size={18} />, color: 'text-blue-600' },
            { label: 'Active listings', value: String(sellerDesigns.length), sub: '3 drafts pending', icon: <LayoutGrid size={18} />, color: 'text-accent' },
            { label: 'Profile views', value: '1,204', sub: 'Last 30 days', icon: <Eye size={18} />, color: 'text-purple-600' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-5">
              <div className={`${s.color} mb-3`}>{s.icon}</div>
              <div className="text-xs text-gray-500 mb-1">{s.label}</div>
              <div className="text-2xl font-semibold mb-0.5">{s.value}</div>
              <div className="text-xs text-gray-400">{s.sub}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
              <h2 className="font-medium">Your listings</h2>
              <Link href="/upload" className="text-xs text-accent hover:text-accent-dark flex items-center gap-1">
                + Add new <ArrowRight size={12} />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-50">
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Title</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Price</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Sales</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {sellerDesigns.map((d) => (
                    <tr key={d.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <Link href={`/listing/${d.id}`} className="text-sm font-medium hover:text-accent transition-colors line-clamp-1">
                          {d.title}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{formatPrice(d.price)}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{d.downloads}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full capitalize ${STATUS_STYLE[d.status]}`}>
                          {d.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-400">Open plan office layout</td>
                    <td className="px-6 py-4 text-sm text-gray-400">₦35,000</td>
                    <td className="px-6 py-4 text-sm text-gray-400">0</td>
                    <td className="px-6 py-4">
                      <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">Draft</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
              <h2 className="font-medium">Recent activity</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {ACTIVITY.map((a, i) => (
                <div key={i} className="flex items-start gap-3 px-6 py-4">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${a.color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700 leading-snug">{a.text}</p>
                    {a.amount && <p className="text-xs font-semibold text-green-600 mt-0.5">{a.amount}</p>}
                    <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 bg-brand rounded-xl p-5 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-white font-medium text-sm mb-0.5">Pending payout</p>
            <p className="text-3xl font-semibold text-accent">₦249,600</p>
            <p className="text-white/50 text-xs mt-1">Available for withdrawal to your bank account</p>
          </div>
          <button className="bg-accent hover:bg-accent-dark text-white font-medium px-6 py-3 rounded-lg text-sm transition-colors">
            Withdraw funds
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}