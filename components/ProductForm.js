'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const BADGES = ['', 'جدید', 'محبوب', 'پرفروش', 'دست‌ساز ویژه'];

export default function ProductForm({ initialProduct }) {
  const router = useRouter();
  const isEdit = Boolean(initialProduct);
  const [form, setForm] = useState({
    name: initialProduct?.name || '',
    category: initialProduct?.category || '',
    price: initialProduct?.price ?? '',
    description: initialProduct?.description || '',
    stock: initialProduct?.stock ?? 0,
    badge: initialProduct?.badge || '',
    featured: initialProduct?.featured || false,
    image_url: initialProduct?.image_url || '',
  });
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!form.name || !form.category) {
      setError('نام و دسته‌بندی محصول الزامی است.');
      return;
    }
    setSaving(true);
    const supabase = createClient();
    let imageUrl = form.image_url;

    try {
      if (file) {
        const ext = file.name.split('.').pop();
        const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadError } = await supabase.storage.from('product-images').upload(path, file);
        if (uploadError) throw uploadError;
        const { data: publicUrl } = supabase.storage.from('product-images').getPublicUrl(path);
        imageUrl = publicUrl.publicUrl;
      }

      const payload = {
        name: form.name,
        category: form.category,
        price: form.price === '' ? null : Number(form.price),
        description: form.description,
        stock: Number(form.stock) || 0,
        badge: form.badge,
        featured: form.featured,
        image_url: imageUrl,
      };

      if (isEdit) {
        const { error: updateError } = await supabase.from('products').update(payload).eq('id', initialProduct.id);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase.from('products').insert(payload);
        if (insertError) throw insertError;
      }

      router.push('/admin');
      router.refresh();
    } catch (err) {
      console.error(err);
      setError('خطا در ذخیره‌سازی محصول. مطمئن شوید bucket با نام product-images ساخته‌اید.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-wood/10 p-6 space-y-5 max-w-xl">
      {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}

      <div>
        <label className="block text-sm font-bold mb-1.5">نام محصول</label>
        <input value={form.name} onChange={(e) => update('name', e.target.value)} className="w-full border border-wood/15 rounded-xl px-4 py-2.5 text-sm" />
      </div>

      <div>
        <label className="block text-sm font-bold mb-1.5">دسته‌بندی</label>
        <input value={form.category} onChange={(e) => update('category', e.target.value)} className="w-full border border-wood/15 rounded-xl px-4 py-2.5 text-sm" placeholder="مثلاً: سینی سرو" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold mb-1.5">قیمت (تومان)</label>
          <input type="number" value={form.price} onChange={(e) => update('price', e.target.value)} className="w-full border border-wood/15 rounded-xl px-4 py-2.5 text-sm" placeholder="خالی = استعلام قیمت" />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1.5">موجودی</label>
          <input type="number" value={form.stock} onChange={(e) => update('stock', e.target.value)} className="w-full border border-wood/15 rounded-xl px-4 py-2.5 text-sm" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold mb-1.5">برچسب</label>
        <select value={form.badge} onChange={(e) => update('badge', e.target.value)} className="w-full border border-wood/15 rounded-xl px-4 py-2.5 text-sm">
          {BADGES.map((b) => <option key={b} value={b}>{b || 'بدون برچسب'}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold mb-1.5">توضیحات</label>
        <textarea value={form.description} onChange={(e) => update('description', e.target.value)} rows={3} className="w-full border border-wood/15 rounded-xl px-4 py-2.5 text-sm" />
      </div>

      <div>
        <label className="block text-sm font-bold mb-1.5">تصویر محصول</label>
        {form.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={form.image_url} alt="" className="w-24 h-24 rounded-xl object-cover mb-2" />
        )}
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="text-sm" />
      </div>

      <label className="flex items-center gap-2 text-sm font-semibold">
        <input type="checkbox" checked={form.featured} onChange={(e) => update('featured', e.target.checked)} />
        محصول ویژه (نمایش برجسته)
      </label>

      <button type="submit" disabled={saving} className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition disabled:opacity-50">
        {saving ? 'در حال ذخیره...' : isEdit ? 'ذخیره تغییرات' : 'افزودن محصول'}
      </button>
    </form>
  );
    }
