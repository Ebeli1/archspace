'use client';
import { useRole } from '@/context/RoleContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import DashboardContent from '@/components/DashboardContent';

export default function DashboardPage() {
  const { role, isLoading } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && role !== 'seller') {
      router.push('/auth');
    }
  }, [role, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C8A96E] mx-auto"></div>
      </div>
    );
  }

  if (role !== 'seller') {
    return null;
  }

  return <DashboardContent />;
}