import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface UploadData {
  name: string;
  price: number;
  category: string;
  detail: string;
  url: string;
}

interface UploadFileHook {
  progress: number;
  loading: boolean;
  uploadFile: (file: File, data: UploadData) => Promise<void>;
}

export const useUploadFile = (): UploadFileHook => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const uploadFile = async (file: File, data: UploadData) => {
    setLoading(true);
    setProgress(10);

    const supabase = createClient();
    const filePath = `images/${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from('item-images')
      .upload(filePath, file);

    if (uploadError) {
      console.error(uploadError);
      setLoading(false);
      throw new Error(uploadError.message);
    }

    setProgress(70);

    const {
      data: { publicUrl },
    } = supabase.storage.from('item-images').getPublicUrl(filePath);

    const { error: insertError } = await supabase.from('items').insert({
      name: data.name,
      price: data.price,
      category: data.category,
      detail: data.detail,
      url: data.url,
      image_url: publicUrl,
    });

    if (insertError) {
      console.error(insertError);
      setLoading(false);
      throw new Error(insertError.message);
    }

    setProgress(100);
    setLoading(false);
  };

  return { progress, loading, uploadFile };
};
