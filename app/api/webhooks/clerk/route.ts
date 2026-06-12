import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error('CLERK_WEBHOOK_SECRET is not set');
  }

  const headerPayload = await headers();
  const svixId = headerPayload.get('svix-id');
  const svixTimestamp = headerPayload.get('svix-timestamp');
  const svixSignature = headerPayload.get('svix-signature');

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('No svix headers', { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(SIGNING_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Webhook verification failed:', err);
    return new Response('Webhook verification failed', { status: 400 });
  }

  // Handle user events only
  const eventType = evt.type;
  
  if (eventType === 'user.created' || eventType === 'user.updated') {
    // Type assertion for user data
    const userData = evt.data as any;
    const userId = userData.id;
    const email = userData.email_addresses?.[0]?.email_address || '';
    const firstName = userData.first_name || '';
    const lastName = userData.last_name || '';
    const fullName = `${firstName} ${lastName}`.trim();
    const avatarUrl = userData.image_url;
    
    await supabaseAdmin
      .from('profiles')
      .upsert({
        clerk_id: userId,
        email: email,
        full_name: fullName || 'User',
        avatar_url: avatarUrl,
      }, { onConflict: 'clerk_id' });
  }
  
  if (eventType === 'user.deleted') {
    const userData = evt.data as any;
    const userId = userData.id;
    await supabaseAdmin.from('profiles').delete().eq('clerk_id', userId);
  }

  return new Response('Webhook received', { status: 200 });
}