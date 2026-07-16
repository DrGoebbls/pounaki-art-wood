'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/lib/cart-context';

function formatPrice(price) {
  return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
}

export default function CartPage() {
  const { items, removeItem, updateQty, total } = useCart();

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-14 min-h-[50vh]">
        <h1 className="font-black text-2xl sm:text-3xl text-wood-dark mb-8">سبد خرید شما</h1>

        {items.length === 0 ? (
          <div className="text-center py-20 text-ink/50">
            <p className="mb-6">سبد خرید شما خالی است.</p>
            <Link href="/#products" className="bg-primary text-white font-bold px-6 py-3 rounded-xl">مشاهده محصولات</Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-10">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 bg-white border border-wood/10 rounded-2xl p-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-wood-light/20 shrink-0">
                    {item.image_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-wood-dark mb-1">{item.name}</p>
                    <p className="text-primary font-bold text-sm">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-8 h-8 rounded-full bg-bg border border-wood/15 font-bold">-</button>
                    <span className="w-6 text-center font-bold">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-8 h-8 rounded-full bg-bg border border-wood/15 font-bold">+</button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-red-500 text-xs font-bold hover:underline">حذف</button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-wood/10 pt-6">
              <span className="font-bold text-lg">مجموع:</span>
              <span className="font-black text-xl text-primary">{formatPrice(total)}</span>
            </div>

            <Link href="/checkout" className="block text-center mt-6 bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition">
              ادامه فرآیند خرید و پرداخت
            </Link>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
