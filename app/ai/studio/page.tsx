import AIChat from '@/components/ai/AIChat';
import Navbar from '@/components/layout/Navbar';
import { Sparkles, FileText, Palette, Building2, Download } from 'lucide-react';

const WELCOME_MESSAGE = `Hi! I'm your ArchSpace AI Design Studio.

I'll help you create a detailed design brief for your project — entirely through conversation. Whether it's a family home, apartment interior, or commercial space, I'll ask the right questions and build a professional brief you can hand to any architect or designer.

**Where shall we start?** Tell me a little about your project — what type of space are you designing?`;

const SUGGESTIONS = [
  '3-bedroom bungalow in Lagos',
  'Luxury apartment interior, Abuja',
  'Open-plan office for 20 staff',
  'Master bedroom redesign',
  'Restaurant space in Victoria Island',
];

export default function AIStudioPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="lg:w-72 flex-shrink-0">
          <div className="sticky top-24 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={16} className="text-accent" />
                <h1 className="font-semibold text-base">AI Design Studio</h1>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Describe your dream space in plain language. I'll turn your ideas into a professional design brief.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">What you'll get</p>
              <div className="flex items-center gap-2.5 text-sm text-gray-600">
                <FileText size={14} className="text-accent" />
                Room-by-room specification
              </div>
              <div className="flex items-center gap-2.5 text-sm text-gray-600">
                <Palette size={14} className="text-accent" />
                Material & colour palette
              </div>
              <div className="flex items-center gap-2.5 text-sm text-gray-600">
                <Building2 size={14} className="text-accent" />
                Nigerian-specific design notes
              </div>
              <div className="flex items-center gap-2.5 text-sm text-gray-600">
                <Download size={14} className="text-accent" />
                Downloadable brief PDF
              </div>
            </div>

            <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
              <p className="text-xs font-semibold text-accent-dark mb-1">💡 Pro tip</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                The more detail you give, the better your brief. Mention your location in Nigeria, who will use the space, and your rough budget.
              </p>
            </div>

            <div className="bg-brand text-white rounded-xl p-4">
              <p className="text-xs font-semibold mb-1">Hand off to a designer</p>
              <p className="text-xs text-white/70 leading-relaxed mb-3">
                Once your brief is ready, ArchSpace designers can quote to turn it into full CAD drawings.
              </p>
              <a href="/browse" className="block text-center text-xs bg-accent hover:bg-accent-dark text-white font-medium py-2 rounded-lg transition-colors">
                Browse designers →
              </a>
            </div>
          </div>
        </aside>

        {/* Chat Panel */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col" style={{ minHeight: '600px' }}>
          <AIChat
            feature="studio"
            welcomeMessage={WELCOME_MESSAGE}
            suggestions={SUGGESTIONS}
            placeholder="e.g. I want to build a 4-bedroom house on a 600 sqm plot in Lekki..."
          />
        </div>
      </div>
    </div>
  );
}
