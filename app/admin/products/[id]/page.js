import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AdminNav from '@/components/AdminNav';
import ProductForm from '@/components/ProductForm';

export const revalidate = 0;

export default async function EditProductPage({ params }) {
  const supabase = createClient();
  const { data: product } = await supabase.from('products').select('*').eq('id', params.id).single();

  if (!product) notFound();

  return (
    <div className="min-h-screen bg-bg">
      <AdminNav />
      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="font-bold text-lg mb-6">ویرایش محصول</h1>
        <ProductForm initialProduct={product} />
      </main>
    </div>
  );
}
