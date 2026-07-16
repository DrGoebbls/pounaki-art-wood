import './globals.css';
import { Vazirmatn } from 'next/font/google';
import { CartProvider } from '@/lib/cart-context';

const vazir = Vazirmatn({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-vazir',
  display: 'swap',
});

export const metadata = {
  title: 'پونکی آرت وود | Pounaki Art Wood',
  description: 'خلاقیت بی‌پایان با چوب و رزین؛ تخیل شما را به واقعیت تبدیل می‌کند. محصولات دست‌ساز چوب و رزین اپوکسی.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable}>
      <body className="font-vazir antialiased bg-bg text-ink">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
