import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const isProd = process.env.ZARINPAL_PRODUCTION === 'true';
const ZARINPAL_BASE = isProd
  ? 'https://payment.zarinpal.com/pg/v4/payment'
  : 'https://sandbox.zarinpal.com/pg/v4/payment';
const ZARINPAL_STARTPAY = isProd
  ? 'https://payment.zarinpal.com/pg/StartPay'
  : 'https://sandbox.zarinpal.com/pg/StartPay';

export async function POST(request) {
  try {
    const { customer, items, total } = await request.json();

    if (!customer?.name || !customer?.phone || !customer?.address || !items?.length || !total) {
      return NextResponse.json({ error: 'اطلاعات ناقص است.' }, { status: 400 });
    }

    const supabase = createClient();

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_name: customer.name,
        phone: customer.phone,
        address: customer.address,
        items,
        total,
        status: 'pending',
      })
      .select()
      .single();

    if (orderError || !order) {
      console.error(orderError);
      return NextResponse.json({ error: 'خطا در ثبت سفارش.' }, { status: 500 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
    const callbackUrl = `${siteUrl}/api/checkout/verify?order=${order.id}`;

    const zRes = await fetch(`${ZARINPAL_BASE}/request.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merchant_id: process.env.ZARINPAL_MERCHANT_ID,
        currency: 'IRT',
        amount: Math.round(total),
        callback_url: callbackUrl,
        description: `سفارش پونکی آرت وود - ${order.id}`,
        metadata: { mobile: customer.phone },
      }),
    });

    const zData = await zRes.json();

    if (zData?.data?.code === 100 && zData.data.authority) {
      await supabase.from('orders').update({ authority: zData.data.authority }).eq('id', order.id);
      return NextResponse.json({ paymentUrl: `${ZARINPAL_STARTPAY}/${zData.data.authority}` });
    }

    console.error('Zarinpal error:', zData);
    return NextResponse.json(
      { error: 'اتصال به درگاه پرداخت ناموفق بود. لطفاً merchant id زرین‌پال را بررسی کنید.' },
      { status: 502 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'خطای غیرمنتظره سرور.' }, { status: 500 });
  }
}
