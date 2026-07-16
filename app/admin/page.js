import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import AdminNav from '@/components/AdminNav';
import AdminProductList from '@/components/AdminProductList';

export const revalidate = 0;

export default async function AdminDashboard() {
  const supabase = createClient();
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  const { count: ordersCount } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'paid');

  return (
    <div className="min-h-screen bg-bg">
      <AdminNav />
      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-wood/10">
            <p className="text-sm text-ink/50 mb-1">تعداد محصولات</p>
            <p className="font-black text-2xl text-wood-dark">{products?.length || 0}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-wood/10">
            <p className="text-sm text-ink/50 mb-1">سفارش‌های پرداخت‌شده</p>
            <p className="font-black text-2xl text-primary">{ordersCount || 0}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg">محصولات</h2>
          <Link href="/admin/products/new" className="bg-primary text-white font-bold px-5 py-2.5 rounded-xl text-sm">+ افزودن محصول جدید</Link>
        </div>

        <AdminProductList initialProducts={products || []} />
      </main>
    </div>
  );
}
