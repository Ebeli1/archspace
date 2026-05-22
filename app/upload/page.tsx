'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Upload, X, Image as ImageIcon, FileText, 
  Check, AlertCircle, ChevronRight, CloudUpload 
} from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const CATEGORIES = [
  { value: 'floor-plan', label: 'Floor Plan', icon: '🏠' },
  { value: 'interior-design', label: 'Interior Design', icon: '🛋️' },
  { value: '3d-render', label: '3D Render', icon: '🎨' },
  { value: 'exterior', label: 'Exterior / Facade', icon: '🏢' },
  { value: 'commercial', label: 'Commercial', icon: '🏭' },
  { value: 'bim-cad', label: 'BIM / CAD Files', icon: '📐' },
];

const LICENSE_TYPES = [
  { value: 'non-exclusive', label: 'Non-Exclusive', description: 'Multiple buyers can purchase this design', price: 'Lower price, higher volume' },
  { value: 'exclusive', label: 'Exclusive', description: 'Only one buyer gets the rights', price: 'Premium price' },
];

export default function UploadPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    licenseType: 'non-exclusive',
    tags: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'files' | 'cover') => {
    const selectedFiles = Array.from(e.target.files || []);
    
    if (type === 'files') {
      setFiles([...files, ...selectedFiles]);
    } else {
      const file = selectedFiles[0];
      if (file) {
        setCoverImage(file);
        const preview = URL.createObjectURL(file);
        setCoverPreview(preview);
      }
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const removeCover = () => {
    setCoverImage(null);
    setCoverPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Redirect after 2 seconds
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={40} className="text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Design Submitted!</h1>
            <p className="text-gray-500 mb-6">
              Your design has been submitted for review. We'll notify you within 24 hours once it's approved.
            </p>
            <div className="animate-pulse">
              <p className="text-sm text-gray-400">Redirecting to dashboard...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">List a Design</h1>
          <p className="text-gray-500 mt-1">Share your work with Nigeria's design community</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step ? 'bg-accent text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    currentStep > step ? 'bg-accent' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>Basic Info</span>
            <span>Files & Media</span>
            <span>Pricing & Submit</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Design Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Modern 4-bedroom Duplex"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.icon} {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Describe your design, what's included, file formats, dimensions, etc."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">
                  Be detailed! This helps buyers understand what they're getting.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="e.g., modern, duplex, lagos, contemporary"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Step 2: Files & Media */}
          {currentStep === 2 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
              {/* Cover Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Image *
                </label>
                {coverPreview ? (
                  <div className="relative inline-block">
                    <img
                      src={coverPreview}
                      alt="Cover preview"
                      className="w-48 h-32 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={removeCover}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-accent transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <ImageIcon size={24} className="text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Click to upload cover image</p>
                      <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'cover')}
                      className="hidden"
                      required={!coverPreview}
                    />
                  </label>
                )}
              </div>

              {/* Design Files */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Design Files *
                </label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-accent transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <CloudUpload size={24} className="text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Upload design files</p>
                    <p className="text-xs text-gray-400">DWG, PDF, SKP, BLEND, RVT (Max 100MB)</p>
                  </div>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleFileUpload(e, 'files')}
                    className="hidden"
                  />
                </label>
                
                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-gray-700">Uploaded files:</p>
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileText size={16} className="text-gray-400" />
                          <span className="text-sm text-gray-600">{file.name}</span>
                          <span className="text-xs text-gray-400">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Pricing & Submit */}
          {currentStep === 3 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
              {/* License Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  License Type *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {LICENSE_TYPES.map(license => (
                    <label
                      key={license.value}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.licenseType === license.value
                          ? 'border-accent bg-accent/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="licenseType"
                        value={license.value}
                        checked={formData.licenseType === license.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">{license.label}</p>
                          <p className="text-sm text-gray-500 mt-1">{license.description}</p>
                          <p className="text-xs text-gray-400 mt-1">{license.price}</p>
                        </div>
                        {formData.licenseType === license.value && (
                          <Check size={20} className="text-accent" />
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₦) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    required
                  />
                </div>
                {formData.price && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Your earnings (80%)</span>
                      <span className="font-semibold text-green-600">
                        ₦{Math.round(parseInt(formData.price) * 0.8).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-600">ArchSpace fee (20%)</span>
                      <span className="text-gray-600">
                        ₦{Math.round(parseInt(formData.price) * 0.2).toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 rounded-lg p-4 flex gap-3">
                <AlertCircle size={20} className="text-blue-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Before you submit</p>
                  <p className="text-xs text-blue-600 mt-1">
                    Our team will review your design within 24 hours. Make sure all files are correct 
                    and you own the rights to this design.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            )}
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors ml-auto"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit for Review'}
              </button>
            )}
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}