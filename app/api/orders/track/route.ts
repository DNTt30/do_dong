import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Basic in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function maskString(str: string, visibleStart = 1, visibleEnd = 0): string {
  if (!str) return '';
  const length = str.length;
  if (length <= visibleStart + visibleEnd) return str;
  const start = str.substring(0, visibleStart);
  const end = visibleEnd > 0 ? str.substring(length - visibleEnd) : '';
  const masked = '*'.repeat(Math.max(3, length - visibleStart - visibleEnd));
  return `${start}${masked}${end}`;
}

export async function GET(request: Request) {
  try {
    // 1. Rate limiting based on IP (or a fallback identifier)
    const ip = request.headers.get('x-forwarded-for') || 'unknown-ip';
    const now = Date.now();
    let rateData = rateLimitMap.get(ip);

    if (!rateData || now - rateData.lastReset > RATE_LIMIT_WINDOW_MS) {
      rateData = { count: 1, lastReset: now };
    } else {
      rateData.count++;
    }
    rateLimitMap.set(ip, rateData);

    if (rateData.count > MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // 2. Parse phone number
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get('phone');

    if (!phone || typeof phone !== 'string') {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    // 3. Fetch from Supabase
    const { data, error } = await supabase
      .from('orders')
      .select('id, createdAt, status, items, totalAmount, customerName, customerAddress')
      .eq('customerPhone', phone.trim())
      .order('createdAt', { ascending: false });

    if (error) throw error;

    // 4. Mask PII to mitigate IDOR
    const safeData = (data || []).map((order) => ({
      ...order,
      customerName: maskString(order.customerName, 1, 0), // "N******"
      customerAddress: maskString(order.customerAddress, 3, 0), // "Hà *****"
    }));

    return NextResponse.json(safeData);
  } catch (error) {
    console.error('API Error /api/orders/track:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
