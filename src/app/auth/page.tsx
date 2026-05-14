'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AuthPage() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-brand px-6 py-4">
        <Link href="/" className="text-xl font-semibold text-white">
          Arch<span className="text-accent">Space</span>
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl border border-gray-100 p-1 flex gap-1 mb-6">
            {(['signin', 'signup'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  mode === m ? 'bg-brand text-white' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {m === 'signin' ? 'Sign in' : 'Create account'}
              </button>
            ))}
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h1 className="text-xl font-semibold mb-5">{mode === 'signin' ? 'Welcome back' : 'Join ArchSpace'}</h1>
            {mode === 'signup' && (
              <div className="mb-5">
                <p className="label">I want to</p>
                <div className="grid grid-cols-2 gap-3">
                  {(['buyer', 'seller'] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                        role === r ? 'border-accent bg-accent/5 text-accent-dark' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {r === 'buyer' ? '🏠 Browse & buy' : '✏️ Sell designs'}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <form className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="label">Full name</label>
                  <input type="text" className="input-field" placeholder="Chukwudi Adesanya" />
                </div>
              )}
              <div>
                <label className="label">Email address</label>
                <input type="email" className="input-field" placeholder="you@example.com" />
              </div>
              <div>
                <label className="label">Password</label>
                <input type="password" className="input-field" placeholder="••••••••" />
              </div>
              {mode === 'signin' && (
                <div className="text-right">
                  <a href="#" className="text-xs text-accent hover:text-accent-dark">
                    Forgot password?
                  </a>
                </div>
              )}
              <button type="submit" className="btn-primary w-full text-center mt-2">
                {mode === 'signin' ? 'Sign in' : 'Create account'}
              </button>
            </form>
            <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
              By continuing you agree to our{' '}
              <a href="#" className="text-accent">
                Terms of use
              </a>{' '}
              and{' '}
              <a href="#" className="text-accent">
                Privacy policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}