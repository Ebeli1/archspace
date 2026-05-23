import AIChat from '@/components/ai/AIChat';
import Navbar from '@/components/layout/Navbar';
import { RefreshCw, Upload, CheckCircle, AlertTriangle, Image, FileImage } from 'lucide-react';

const WELCOME_MESSAGE = `Hi! I'm your ArchSpace Remodel Assistant.

Upload a photo or scan of your existing floor plan, or describe your current layout — I'll analyse it and suggest practical improvements tailored to Nigerian construction realities.

**What would you like to change about your space?**`;

const SUGGESTIONS = [
  'My living room and kitchen feel disconnected',
  'The master bedroom is too small',
  'I want to add a home office',
  'Poor ventilation throughout the house',
  'Need to fit a generator room',
];

export default function AIRemodelPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col lg:flex-row gap-6">
        <aside className="lg:w-72 flex-shrink-0">
          <div className="sticky top-24 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <RefreshCw size={16} className="text-accent" />
                <h1 className="font-semibold text-base">Remodel Assistant</h1>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Upload your existing floor plan or describe your layout. Get expert suggestions on what to change and why.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">How it works</p>
              <div className="flex items-center gap-2.5 text-sm text-gray-600">
                <Upload size={14} className="text-accent" />
                1. Upload your floor plan image
              </div>
              <div className="flex items-center gap-2.5 text-sm text-gray-600">
                <RefreshCw size={14} className="text-accent" />
                2. Describe what's not working
              </div>
              <div className="flex items-center gap-2.5 text-sm text-gray-600">
                <CheckCircle size={14} className="text-accent" />
                3. Get specific change recommendations
              </div>
              <div className="flex items-center gap-2.5 text-sm text-gray-600">
                <AlertTriangle size={14} className="text-accent" />
                4. See structural & cost notes
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
              <p className="text-xs font-semibold text-amber-800 mb-1">⚠️ Important note</p>
              <p className="text-xs text-amber-700 leading-relaxed">
                AI suggestions are advisory only. Always consult a licensed Nigerian architect before making structural changes. Some walls may be load-bearing.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Supported formats</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-1 h-1 rounded-full bg-accent" />
                Floor plan photos (JPG, PNG)
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-1 h-1 rounded-full bg-accent" />
                Scanned drawings
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-1 h-1 rounded-full bg-accent" />
                Screenshots from CAD tools
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1 bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col" style={{ minHeight: '600px' }}>
          <AIChat
            feature="remodel"
            welcomeMessage={WELCOME_MESSAGE}
            suggestions={SUGGESTIONS}
            placeholder="Describe your layout or attach a floor plan image…"
          />
        </div>
      </div>
    </div>
  );
}