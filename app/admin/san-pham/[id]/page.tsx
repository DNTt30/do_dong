'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import ProductForm from '@/components/admin/ProductForm';
import { Loader2 } from 'lucide-react';

export default function EditProductPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [initialData, setInitialData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
      
    if (data) {
      setInitialData(data);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="animate-spin text-muted-foreground w-8 h-8" />
      </div>
    );
  }

  if (!initialData) {
    return (
      <div className="p-8 text-center text-muted-foreground bg-white rounded-xl border border-border">
        Không tìm thấy sản phẩm hoặc sản phẩm đã bị xóa.
      </div>
    );
  }

  return (
    <div>
      <ProductForm initialData={initialData} />
    </div>
  );
}
