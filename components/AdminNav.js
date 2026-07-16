'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AdminNav() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <header className="bg-wood-dark text-white">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/admin" className="font-extrabold">پنل مدیریت پونکی آرت وود</Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/" target="_blank" className="text-white/70 hover:text-white transition">مشاهده سایت</Link>
          <button onClick={handleLogout} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition">خروج</button>
        </div>
      </div>
    </header>
  );
}
