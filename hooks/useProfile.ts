'use client';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { createClient } from '@/lib/supabase/client';

export function useProfile() {
  const { user, isSignedIn } = useUser();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      if (!isSignedIn || !user) {
        setLoading(false);
        return;
      }

      const supabase = createClient();
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('clerk_id', user.id)
        .single();

      if (!error && data) {
        setProfile(data);
      }
      setLoading(false);
    }

    fetchProfile();
  }, [isSignedIn, user]);

  return { profile, loading };
}