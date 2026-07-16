'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/lib/cart-context';

export default function Header() {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-primary text-white text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-6 sm:gap-10 overflow-x-auto whitespace-nowrap">
          <span>🌿 کاملاً دست‌ساز</span>
          <span>🚚 ارسال به سراسر ایران</span>
          <span>✨ سفارش اختصاصی</span>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-wood/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20 gap-4">
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <span className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-gold/60 bg-white">
                <Image src="/logo.png" alt="پونکی آرت وود" fill className="object-cover" />
              </span>
              <span className="leading-tight">
                <span className="block font-extrabold text-lg text-wood-dark">پونکی آرت وود</span>
                <span className="block text-[11px] tracking-[0.2em] text-gold uppercase">Pounaki Art Wood</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-7 text-[13.5px] font-medium text-ink/80">
              <Link href="/#categories" className="hover:text-primary transition">دسته‌بندی‌ها</Link>
              <Link href="/#products" className="hover:text-primary transition">محصولات</Link>
              <Link href="/#about" className="hover:text-primary transition">درباره ما</Link>
              <Link href="/#contact" className="hover:text-primary transition">تماس با ما</Link>
            </nav>

            <div className="flex items-center gap-1 sm:gap-2">
              <Link href="/cart" className="relative p-2.5 rounded-full hover:bg-primary/10 transition">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
                </svg>
                {count > 0 && (
                  <span className="absolute -top-1 -left-1 bg-gold text-white text-[10px] font-bold rounded-full grid place-items-center" style={{ width: 18, height: 18 }}>
                    {count}
                  </span>
                )}
              </Link>
              <button className="p-2.5 rounded-full hover:bg-primary/10 transition lg:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="منو">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-wood/10 bg-white px-4 py-3 flex flex-col gap-1 text-sm">
            <Link href="/#categories" className="py-2.5 border-b border-wood/5" onClick={() => setMenuOpen(false)}>دسته‌بندی‌ها</Link>
            <Link href="/#products" className="py-2.5 border-b border-wood/5" onClick={() => setMenuOpen(false)}>محصولات</Link>
            <Link href="/#about" className="py-2.5 border-b border-wood/5" onClick={() => setMenuOpen(false)}>درباره ما</Link>
            <Link href="/#contact" className="py-2.5" onClick={() => setMenuOpen(false)}>تماس با ما</Link>
          </div>
        )}
      </header>
    </>
  );
    }
