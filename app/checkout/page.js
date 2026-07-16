'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/lib/cart-context';

function formatPrice(price) {
  return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
}

export default function CheckoutPage() {
  const { items, total } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="max-w-2xl mx-auto px-4 py-20 text-center text-ink/50">
          سبد خرید شما خالی است.
        </main>
        <Footer />
      </>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!form.name || !form.phone || !form.address) {
      setError('لطفاً همه فیلدها را پر کنید.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer: form, items, total }),
      });
      const data = await res.json();
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        setError(data.error || 'خطا در اتصال به درگاه پرداخت. لطفاً دوباره تلاش کنید.');
        setLoading(false);
      }
    } catch (err) {
      setError('خطا در ارتباط با سرور. اتصال اینترنت را بررسی کنید.');
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-14">
        <h1 className="font-black text-2xl sm:text-3xl text-wood-dark mb-8">تکمیل سفارش</h1>

        <div className="bg-white border border-wood/10 rounded-2xl p-5 mb-8">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm py-1.5">
              <span>{item.name} × {item.qty}</span>
              <span className="font-bold">{formatPrice(item.price * item.qty)}</span>
            </div>
          ))}
          <div className="flex justify-between pt-3 mt-3 border-t border-wood/10 font-black text-primary">
            <span>مجموع</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1.5">نام و نام خانوادگی</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-wood/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1.5">شماره موبایل</label>
            <input
              type="tel"
              dir="ltr"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full border border-wood/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="09xxxxxxxxx"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1.5">آدرس کامل</label>
            <textarea
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              rows={3}
              className="w-full border border-wood/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition disabled:opacity-50"
          >
            {loading ? 'در حال اتصال به درگاه پرداخت...' : 'پرداخت و ثبت سفارش'}
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
            }
