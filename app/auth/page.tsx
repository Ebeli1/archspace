'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useRole } from '@/context/RoleContext';
import { User, Store, Check, ArrowLeft } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const { setRole } = useRole();
  const [selectedRole, setSelectedRole] = useState<'buyer' | 'seller' | null>(null);
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (isSignUp && !selectedRole) {
      setError('Please select whether you want to buy or sell designs');
      return;
    }
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (isSignUp && !name) {
      setError('Please enter your full name');
      return;
    }
    
    // Simulate successful sign up/sign in
    if (selectedRole) {
      setRole(selectedRole);
    } else if (!isSignUp) {
      // For sign in, default to buyer if no role selected
      setRole('buyer');
    }
    
    // Redirect to homepage
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A2E] to-[#2D2D4E]">
      <div className="max-w-md mx-auto px-4 py-16">
        {/* Back to Home button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-white">
              Arch<span className="text-[#C8A96E]">Space</span>
            </h1>
          </Link>
          <p className="text-white/60 mt-2">Nigeria's Design Marketplace</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(true);
                setError('');
              }}
              className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                isSignUp ? 'bg-[#C8A96E] text-white' : 'bg-gray-100 text-gray-500'
              }`}
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(false);
                setError('');
                setSelectedRole(null);
              }}
              className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                !isSignUp ? 'bg-[#C8A96E] text-white' : 'bg-gray-100 text-gray-500'
              }`}
            >
              Sign In
            </button>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A96E]"
                  required={isSignUp}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A96E]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A96E]"
                required
              />
            </div>

            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">I want to</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRole('buyer');
                      setError('');
                    }}
                    className={`p-4 border-2 rounded-xl text-left transition-all ${
                      selectedRole === 'buyer'
                        ? 'border-[#C8A96E] bg-[#C8A96E]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <User size={20} className={selectedRole === 'buyer' ? 'text-[#C8A96E]' : 'text-gray-400'} />
                      {selectedRole === 'buyer' && <Check size={16} className="text-[#C8A96E]" />}
                    </div>
                    <p className="font-semibold mt-2">Buy Designs</p>
                    <p className="text-xs text-gray-500 mt-1">Browse and purchase designs</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRole('seller');
                      setError('');
                    }}
                    className={`p-4 border-2 rounded-xl text-left transition-all ${
                      selectedRole === 'seller'
                        ? 'border-[#C8A96E] bg-[#C8A96E]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Store size={20} className={selectedRole === 'seller' ? 'text-[#C8A96E]' : 'text-gray-400'} />
                      {selectedRole === 'seller' && <Check size={16} className="text-[#C8A96E]" />}
                    </div>
                    <p className="font-semibold mt-2">Sell Designs</p>
                    <p className="text-xs text-gray-500 mt-1">Earn from your work</p>
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#C8A96E] text-white font-semibold rounded-lg hover:bg-[#8B6A2E] transition-colors"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}