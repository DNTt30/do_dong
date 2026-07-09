'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import CategoryForm from '@/components/admin/CategoryForm';
import { Loader2 } from 'lucide-react';

export default function EditCategoryPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [initialData, setInitialData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchCategory();
    }
  }, [id]);

  const fetchCategory = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('categories')
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
      <div className="p-8 text-center text-muted-foreground bg-white rounded-xl border border-border mt-6">
        Không tìm thấy danh mục hoặc danh mục đã bị xóa.
      </div>
    );
  }

  return (
    <div className="py-6">
      <CategoryForm initialData={initialData} />
    </div>
  );
}
