'use client';

import Image from 'next/image';
import { useCart } from '@/lib/cart-context';
import { useState } from 'react';

function formatPrice(price) {
  if (price === null || price === undefined) return 'استعلام قیمت';
  return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
}

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <div className="card-hover bg-white rounded-2xl overflow-hidden border border-wood/10 shadow-sm flex flex-col">
      <div className="relative aspect-square bg-wood-light/20">
        {product.image_url && (
          <Image src={product.image_url} alt={product.name} fill className="object-cover" />
        )}
        {product.badge && (
          <span className="absolute top-3 right-3 bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col gap-1.5 flex-1">
        <h3 className="font-bold text-sm text-wood-dark leading-snug">{product.name}</h3>
        {product.stock !== undefined && product.stock !== null && (
          <span className="text-[11px] text-ink/50">
            {product.stock > 0 ? `موجود (${product.stock} عدد)` : 'ناموجود'}
          </span>
        )}
        <div className="mt-auto pt-2 flex items-center justify-between">
          <span className="font-extrabold text-primary text-sm">{formatPrice(product.price)}</span>
        </div>
        <button
          onClick={handleAdd}
          disabled={product.stock === 0}
          className="mt-2 w-full bg-primary/10 hover:bg-primary hover:text-white text-primary font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {added ? 'اضافه شد ✓' : product.stock === 0 ? 'ناموجود' : 'افزودن به سبد'}
        </button>
      </div>
    </div>
  );
                                           }
