'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

function formatPrice(price) {
  if (price === null || price === undefined) return 'استعلام قیمت';
  return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
}

export default function AdminProductList({ initialProducts }) {
  const [products, setProducts] = useState(initialProducts);

  async function handleDelete(id) {
    if (!confirm('این محصول حذف شود؟')) return;
    const supabase = createClient();
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert('خطا در حذف محصول.');
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-wood/10 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-bg text-right">
          <tr>
            <th className="p-4 font-bold">محصول</th>
            <th className="p-4 font-bold">دسته‌بندی</th>
            <th className="p-4 font-bold">قیمت</th>
            <th className="p-4 font-bold">موجودی</th>
            <th className="p-4 font-bold">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t border-wood/10">
              <td className="p-4 flex items-center gap-3">
                {p.image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image_url} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                )}
                <span className="font-semibold">{p.name}</span>
              </td>
              <td className="p-4 text-ink/60">{p.category}</td>
              <td className="p-4 font-bold text-primary">{formatPrice(p.price)}</td>
              <td className="p-4">{p.stock ?? '-'}</td>
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <Link href={`/admin/products/${p.id}`} className="text-primary font-bold hover:underline">ویرایش</Link>
                  <button onClick={() => handleDelete(p.id)} className="text-red-500 font-bold hover:underline">حذف</button>
                </div>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr><td colSpan={5} className="p-8 text-center text-ink/50">هنوز محصولی اضافه نشده است.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
  }
