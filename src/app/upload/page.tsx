'use client';

import { useState } from 'react';
import { CloudUpload, Image as ImageIcon, Check } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const CATEGORIES = [
  { value: 'floor-plan', label: 'Floor plan' },
  { value: 'interior-design', label: 'Interior design' },
  { value: '3d-render', label: '3D render' },
  { value: 'exterior', label: 'Exterior / facade' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'bim-cad', label: 'BIM / CAD file' },
];

export default function UploadPage() {
  const [licenseType, setLicenseType] = useState<'non-exclusive' | 'exclusive'>('non-exclusive');
  const [price, setPrice] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const sellerEarnings = price ? Math.round(Number(price) * 0.8).toLocaleString('en-NG') : '0';

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-lg mx-auto px-4 py-24 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <Check size={28} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-semibold mb-3">Listing submitted!</h1>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">
            Your design has been submitted for review. We'll notify you within 24 hours once it's approved.
          </p>
          <a href="/dashboard" className="btn-primary inline-block">
            Go to your dashboard
          </a>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-1">List a design</h1>
          <p className="text-gray-500 text-sm">Upload your design files and set your price. You keep full copyright.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="label">Design title</label>
            <input type="text" className="input-field" placeholder="e.g. Modern 4-bedroom duplex floor plan" required />
          </div>
          <div>
            <label className="label">Category</label>
            <select className="input-field cursor-pointer" required>
              <option value="">Select a category...</option>
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Description</label>
            <textarea className="input-field resize-none" rows={4} placeholder="Describe what's included..." required />
          </div>
          <div>
            <label className="label">Upload design files</label>
            <label className="block border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-accent/40 transition-colors bg-white">
              <CloudUpload size={30} className="mx-auto text-gray-300 mb-2" />
              <p className="text-sm font-medium text-gray-700 mb-1">Drag & drop your files here</p>
              <p className="text-xs text-gray-400 mb-3">Or click to browse</p>
              <input type="file" className="hidden" multiple />
            </label>
          </div>
          <div>
            <label className="label">Cover image</label>
            <label className="block border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-accent/40 transition-colors bg-white">
              <ImageIcon size={24} className="mx-auto text-gray-300 mb-2" />
              <p className="text-sm font-medium text-gray-700 mb-0.5">Upload high-quality render or photo</p>
              <p className="text-xs text-gray-400">JPG or PNG · recommended 1200x900px</p>
              <input type="file" accept="image/*" className="hidden" />
            </label>
          </div>
          <div>
            <label className="label">Tags (comma separated)</label>
            <input type="text" className="input-field" placeholder="e.g. 4 bedrooms, contemporary, Lagos style" />
          </div>
          <div>
            <label className="label">License type</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'non-exclusive', title: 'Non-exclusive', desc: 'Multiple buyers can purchase. Lower price, higher volume.' },
                { value: 'exclusive', title: 'Exclusive', desc: 'One buyer only gets the rights. Set a premium price.' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setLicenseType(opt.value as any)}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    licenseType === opt.value ? 'border-accent bg-accent/5 ring-1 ring-accent/20' : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <p className={`text-sm font-medium mb-1 ${licenseType === opt.value ? 'text-accent-dark' : ''}`}>{opt.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="label">Your price (₦)</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">₦</span>
              <input
                type="number"
                className="input-field pl-8"
                placeholder="e.g. 45000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="1000"
                step="500"
                required
              />
            </div>
            {price && (
              <p className="text-xs text-gray-500 mt-1.5">
                You earn <span className="font-semibold text-green-600">₦{sellerEarnings}</span> · ArchSpace keeps 20%
              </p>
            )}
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary flex-1 text-center">
              Submit for review
            </button>
            <button type="button" className="btn-outline px-6">
              Save draft
            </button>
          </div>
          <p className="text-xs text-gray-400 text-center leading-relaxed">
            By listing, you confirm you own the rights to this design and agree to our seller terms.
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
}