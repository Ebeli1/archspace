'use client';
import { RefreshCw, Search } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { Check, Sparkles, Zap, Users, Download, MessageCircle, Shield, Crown } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useUser } from '@clerk/nextjs';

export default function PricingPage() {
  const { isSignedIn } = useUser();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for getting started',
      icon: <Zap size={24} />,
      features: [
        'Browse all designs',
        'Save to wishlist',
        'Basic search filters',
        'Email support',
        'View design details',
      ],
      cta: 'Get Started',
      popular: false,
      buttonVariant: 'outline',
    },
    {
      name: 'Pro',
      price: { monthly: 45000, yearly: 450000 },
      description: 'For serious buyers and sellers',
      icon: <Crown size={24} />,
      features: [
        'Everything in Free',
        'AI Design Studio',
        'AI Remodel Assistant',
        'AI Design Advisor',
        'Priority support',
        'Download design briefs as PDF',
        'Unlimited chat with sellers',
        'Early access to new features',
      ],
      cta: 'Upgrade to Pro',
      popular: true,
      buttonVariant: 'primary',
    },
    {
      name: 'Enterprise',
      price: { monthly: 150000, yearly: 1500000 },
      description: 'For firms and organizations',
      icon: <Users size={24} />,
      features: [
        'Everything in Pro',
        'Multiple team accounts',
        'Custom AI training',
        'API access',
        'Dedicated account manager',
        'SLA guarantee',
        'White-label options',
        'Bulk design uploads',
      ],
      cta: 'Contact Sales',
      popular: false,
      buttonVariant: 'outline',
    },
  ];

  const annualSavings = billingCycle === 'yearly' ? 'Save 20% annually' : 'Monthly billing';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand to-brand-light py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-white/70 text-lg mb-8">
            Choose the plan that works for you. All plans include access to our marketplace.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-accent text-white shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-accent text-white shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Yearly
              <span className="ml-1 text-xs bg-green-500/80 text-white px-1.5 py-0.5 rounded-full">Save 20%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                plan.popular ? 'ring-2 ring-accent shadow-2xl' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    {plan.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{plan.name}</h2>
                </div>
                <p className="text-gray-500 mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ₦{billingCycle === 'monthly' ? plan.price.monthly.toLocaleString() : (plan.price.yearly / 12).toLocaleString()}
                  </span>
                  <span className="text-gray-500">/month</span>
                  {billingCycle === 'yearly' && plan.price.yearly > 0 && (
                    <p className="text-sm text-green-600 mt-1">Billed annually (₦{plan.price.yearly.toLocaleString()})</p>
                  )}
                </div>

                <Link
                  href={isSignedIn ? '/dashboard/billing' : '/auth'}
                  className={`block w-full text-center py-3 rounded-xl font-semibold transition-all mb-6 ${
                    plan.buttonVariant === 'primary'
                      ? 'bg-gradient-to-r from-accent to-accent-dark text-white hover:shadow-lg hover:scale-105'
                      : 'border-2 border-gray-200 text-gray-700 hover:border-accent hover:text-accent'
                  }`}
                >
                  {plan.cta}
                </Link>

                <div className="space-y-3">
                  <p className="text-sm font-semibold text-gray-900">What's included:</p>
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check size={16} className="text-green-500 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Features Highlight */}
      <section className="bg-white border-y border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-4 py-2 mb-4">
              <Sparkles size={16} className="text-accent" />
              <span className="text-sm font-medium text-accent-dark">AI-Powered Features</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What You Get with Pro</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Unlock the full power of ArchSpace AI to create, remodel, and find the perfect designs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles size={28} />,
                title: 'AI Design Studio',
                desc: 'Create detailed design briefs through conversation. Get room-by-room specifications, material palettes, and downloadable PDF briefs.',
                link: '/ai/studio',
              },
              {
                icon: <RefreshCw size={28} />,
                title: 'AI Remodel Assistant',
                desc: 'Upload floor plans and get expert suggestions on what to change, structural notes, and cost estimates.',
                link: '/ai/remodel',
              },
              {
                icon: <Search size={28} />,
                title: 'AI Design Advisor',
                desc: 'Tell us what you need and get personalized design recommendations from our catalogue with explanations.',
                link: '/ai/advisor',
              },
            ].map((feature) => (
              <div key={feature.title} className="text-center p-6 rounded-xl hover:shadow-lg transition-all">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 text-accent">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{feature.desc}</p>
                <Link href={feature.link} className="text-accent text-sm hover:underline inline-flex items-center gap-1">
                  Try it now →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Can I switch plans later?', a: 'Yes, you can upgrade, downgrade, or cancel anytime. Changes take effect at the next billing cycle.' },
            { q: 'Do I need a Pro plan to sell designs?', a: 'No! Sellers can list designs for free. Pro plans are for buyers wanting AI features and priority support.' },
            { q: 'What payment methods do you accept?', a: 'We accept all major cards, bank transfers, and Paystack payments. All transactions are securely processed.' },
            { q: 'Is there a free trial?', a: 'Yes! Pro plans come with a 7-day free trial. Cancel anytime before the trial ends.' },
            { q: 'Do you offer refunds?', a: 'We offer refunds within 14 days of purchase if you haven\'t used any paid features.' },
          ].map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900">{faq.q}</h3>
              <p className="text-gray-500 text-sm mt-1">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-brand to-brand-light py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-white/70 mb-8">
            Join thousands of architects and designers using ArchSpace to buy, sell, and create designs.
          </p>
          <Link
            href="/auth"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-semibold px-8 py-3 rounded-xl transition-all hover:scale-105"
          >
            {isSignedIn ? 'Upgrade to Pro' : 'Create Free Account'}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}