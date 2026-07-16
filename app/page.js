import { createClient } from '@/lib/supabase/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductsSection from '@/components/ProductsSection';

const categories = [
  { icon: '🪵', name: 'زیرسیگاری رستیک' },
  { icon: '🕰', name: 'ساعت دیواری چوب و رزین' },
  { icon: '🕰', name: 'ساعت رومیزی چوب و رزین' },
  { icon: '🍽', name: 'سینی سرو' },
  { icon: '📱', name: 'هولدر موبایل' },
  { icon: '📱', name: 'استند موبایل' },
  { icon: '📦', name: 'صندوقچه آنتیک چوبی' },
  { icon: '♟', name: 'تخته نرد دست‌ساز' },
  { icon: '♟', name: 'شطرنج چوبی' },
  { icon: '🚬', name: 'جامیگاری چوبی' },
  { icon: '✨', name: 'محصولات سفارشی' },
];

export const revalidate = 0;

export default async function HomePage() {
  const supabase = createClient();
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <>
      <Header />

      <section id="home" className="relative overflow-hidden">
        <div className="river-panel">
          <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-28 grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-right">
              <span className="inline-flex items-center gap-2 bg-white/10 border border-gold/40 text-gold text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
                هنر دست‌ساز چوب و رزین
              </span>
              <h1 className="font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.25] text-white mb-5">
                پونکی <span className="text-gold">آرت وود</span>
              </h1>
              <p className="text-white/90 text-lg sm:text-xl mb-2">خلاقیت بی‌پایان با چوب و رزین</p>
              <p className="text-white/70 text-base sm:text-lg mb-8">تخیل شما را به واقعیت تبدیل می‌کند</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#products" className="bg-primary hover:bg-primary-dark text-white font-bold px-8 py-3.5 rounded-xl transition shadow-lg text-center">مشاهده محصولات</a>
                <a href="#contact" className="bg-gold hover:brightness-95 text-wood-dark font-bold px-8 py-3.5 rounded-xl transition shadow-lg text-center">سفارش اختصاصی</a>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-md aspect-square rounded-[2.5rem] bg-white/10 border border-white/15 grid place-items-center overflow-hidden">
              {products?.[0]?.image_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={products[0].image_url} alt={products[0].name} className="w-full h-full object-cover rounded-[2rem]" />
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
        <div className="text-center mb-12">
          <span className="text-gold font-bold text-sm tracking-widest">دسته‌بندی محصولات</span>
          <h2 className="font-black text-3xl sm:text-4xl text-wood-dark mt-2">هر قطعه، یک داستان از چوب</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {categories.map(
