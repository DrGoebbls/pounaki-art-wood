import AdminNav from '@/components/AdminNav';
import ProductForm from '@/components/ProductForm';

export default function NewProductPage() {
  return (
    <div className="min-h-screen bg-bg">
      <AdminNav />
      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="font-bold text-lg mb-6">افزودن محصول جدید</h1>
        <ProductForm />
      </main>
    </div>
  );
}
