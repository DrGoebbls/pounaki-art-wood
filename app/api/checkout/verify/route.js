import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const isProd = process.env.ZARINPAL_PRODUCTION === 'true';
const ZARINPAL_BASE = isProd
  ? 'https://payment.zarinpal.com/pg/v4/payment'
  : 'https://sandbox.zarinpal.com/pg/v4/payment';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const authority = searchParams.get('Authority');
  const status = searchParams.get('Status');
  const orderId = searchParams.get('order');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;

  const supabase = createClient();
  const { data: order } = await supabase.from('orders').select('*').eq('id', orderId).single();

  if (!order) {
    return NextResponse.redirect(`${siteUrl}/checkout?error=order_not_found`);
  }

  if (status !== 'OK') {
    await supabase.from('orders').update({ status: 'failed' }).eq('id', orderId);
    return NextResponse.redirect(`${siteUrl}/checkout?error=cancelled`);
  }

  const zRes = await fetch(`${ZARINPAL_BASE}/verify.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      merchant_id: process.env.ZARINPAL_MERCHANT_ID,
      currency: 'IRT',
      amount: Math.round(order.total),
      authority,
    }),
  });

  const zData = await zRes.json();

  if (zData?.data?.code === 100 || zData?.data?.code === 101) {
    await supabase
      .from('orders')
      .update({ status: 'paid', ref_id: String(zData.data.ref_id || '') })
      .eq('id', orderId);

    return NextResponse.redirect(`${siteUrl}/checkout/success?ref=${zData.data.ref_id || ''}`);
  }

  await supabase.from('orders').update({ status: 'failed' }).eq('id', orderId);
  return NextResponse.redirect(`${siteUrl}/checkout?error=payment_failed`);
}
