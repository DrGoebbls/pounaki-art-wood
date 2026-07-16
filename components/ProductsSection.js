'use client';

import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';

const TABS = [
  { key: 'all', label: 'همه محصولات' },
  { key: 'جدید', label: 'جدیدترین محصولات' },
  { key: 'محبوب', label: 'محبوب‌ترین محصولات' },
  { key: 'پرفروش', label: 'پرفروش‌ترین محصولات' },
];

export default function ProductsSection({ products }) {
  const [tab, setTab] = useState('all');

  const filtered = useMemo(() => {
    if (tab === 'all') return products;
    return products.filter((p) => p.badge === tab);
  }, [tab, products]);

  return (
    <section id="products" className="bg-white py-16 sm:py-20 border-y border-wood/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-gold font-bold text-sm tracking-widest">فروشگاه</span>
          <h2 className="font-black text-3xl sm:text-4xl text-wood-dark mt-2">محصولات پونکی آرت وود</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold border border-primary/30 transition ${
                tab === t.key ? 'bg-primary text-white' : 'text-primary'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-ink/50 py-10">محصولی در این دسته موجود نیست.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
          }
