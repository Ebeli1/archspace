'use client';
import { SignIn, SignUp, useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useRole } from '@/context/RoleContext';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true);
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const { setRole } = useRole();

  useEffect(() => {
    if (isSignedIn && user) {
      const userRole = user.publicMetadata?.role as string;
      if (userRole) {
        setRole(userRole as 'buyer' | 'seller');
        router.push('/');
      }
    }
  }, [isSignedIn, user, router, setRole]);

  const handleRoleSelection = (role: 'buyer' | 'seller') => {
    fetch('/api/user/role', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role }),
    }).then(() => {
      setRole(role);
      router.push('/');
    });
  };

  // Show role selection after sign up
  if (isSignedIn && !user?.publicMetadata?.role) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1A1A2E] to-[#2D2D4E] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <Sparkles className="text-accent w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome to ArchSpace!</h2>
            <p className="text-gray-500 mt-1">How would you like to use the platform?</p>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => handleRoleSelection('buyer')}
              className="w-full p-4 border-2 border-gray-200 rounded-xl text-left hover:border-accent hover:bg-accent/5 transition-all group"
            >
              <div className="font-semibold text-lg">🛍️ Buy Designs</div>
              <p className="text-sm text-gray-500">Browse and purchase architectural designs from top creators</p>
            </button>
            <button
              onClick={() => handleRoleSelection('seller')}
              className="w-full p-4 border-2 border-gray-200 rounded-xl text-left hover:border-accent hover:bg-accent/5 transition-all group"
            >
              <div className="font-semibold text-lg">📈 Sell Designs</div>
              <p className="text-sm text-gray-500">Upload your work and earn from your designs</p>
            </button>
          </div>
          <Link href="/" className="mt-6 inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm">
            <ArrowLeft size={14} /> Back to home
          </Link>
        </div>
      </div>
    );
  }

  // Show Clerk auth forms
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A2E] to-[#2D2D4E]">
      <div className="max-w-md mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors">
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <Sparkles className="text-accent w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            Arch<span className="text-accent">Space</span>
          </h1>
          <p className="text-white/50 text-sm mt-1">Nigeria's AI-Powered Design Marketplace</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-3 text-center font-medium transition-all ${
                isSignUp ? 'text-accent border-b-2 border-accent' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-3 text-center font-medium transition-all ${
                !isSignUp ? 'text-accent border-b-2 border-accent' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Sign In
            </button>
          </div>
          <div className="p-6">
            {isSignUp ? (
              <SignUp routing="hash" redirectUrl="/auth" />
            ) : (
              <SignIn routing="hash" redirectUrl="/auth" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}