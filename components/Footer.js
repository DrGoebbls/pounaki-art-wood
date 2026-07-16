export default function Footer() {
  return (
    <footer className="bg-wood-dark text-white/80">
      <div className="max-w-7xl mx-auto px-4 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <span className="font-extrabold text-white block mb-3">پونکی آرت وود</span>
          <p className="text-sm leading-relaxed text-white/60">
            خلاقیت بی‌پایان با چوب و رزین؛ تخیل شما را به واقعیت تبدیل می‌کند.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 text-sm">دسترسی سریع</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="/#about" className="hover:text-gold transition">درباره ما</a></li>
            <li><a href="/#contact" className="hover:text-gold transition">تماس با ما</a></li>
            <li><a href="/#care" className="hover:text-gold transition">راهنمای نگهداری چوب</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 text-sm">دسته‌بندی‌ها</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="/#categories" className="hover:text-gold transition">ساعت دیواری چوب و رزین</a></li>
            <li><a href="/#categories" className="hover:text-gold transition">سینی سرو</a></li>
            <li><a href="/#categories" className="hover:text-gold transition">تخته نرد و شطرنج</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 text-sm">ارتباط با ما</h4>
          <ul className="space-y-2.5 text-sm">
            <li dir="ltr">📷 @pounakiartwood</li>
            <li className="break-all" dir="ltr">✉️ Karshenasponaki@gmail.com</li>
            <li dir="ltr">📞 09352564020</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © ۱۴۰۴ پونکی آرت وود — تمامی حقوق محفوظ است.
      </div>
    </footer>
  );
    }
