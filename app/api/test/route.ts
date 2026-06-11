import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';

export async function GET() {
  const supabase = createClient();
  const { data: designs, error } = await supabase
    .from('designs')
    .select('*')
    .limit(5);
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ success: true, count: designs?.length, designs });
}