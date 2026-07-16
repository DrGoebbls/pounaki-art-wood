'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/lib/cart-context';

export default function SuccessPage() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref');

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 grid place-items-center mx-auto mb-6 text-4xl">✓</div>
        <h1 className="font-black text-2xl sm:text-3xl text-wood-dark mb-3">پرداخت با موفقیت انجام شد</h1>
        <p className="text-ink/60 mb-2">سفارش شما ثبت شد و به زودی برای ارسال آماده می‌شود.</p>
        {ref && <p className="text-sm text-ink/50 mb-8">شماره پیگیری: <span dir="ltr" className="font-bold">{ref}</span></p>}
        <Link href="/" className="inline-block bg-primary text-white font-bold px-8 py-3 rounded-xl">بازگشت به فروشگاه</Link>
      </main>
      <Footer />
    </>
  );
        }
