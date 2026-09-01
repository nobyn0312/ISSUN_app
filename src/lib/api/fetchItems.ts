import { createClient } from '@/lib/supabase/client';

export interface Item {
  id: string;
  category: string;
  createdAt?: string;
  detail: string;
  imageUrl: string;
  name: string;
  price: number;
  url?: string | undefined;
}

type ItemRow = {
  id: string;
  name: string;
  price: number;
  category: string;
  detail: string;
  image_url: string | null;
  url: string;
  created_at: string;
};

const mapItem = (row: ItemRow): Item => ({
  id: row.id,
  name: row.name,
  price: row.price,
  category: row.category,
  detail: row.detail,
  imageUrl: row.image_url ?? '',
  url: row.url,
  createdAt: row.created_at,
});

export const fetchItems = async (
  sortOrder: 'newest' | 'oldest' = 'newest'
): Promise<Item[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .order('created_at', { ascending: sortOrder === 'oldest' });

  if (error) {
    console.error(error);
    throw error;
  }

  return (data ?? []).map(row => mapItem(row as ItemRow));
};

export const fetchItemById = async (id: string): Promise<Item | null> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error(error);
    return null;
  }

  return data ? mapItem(data as ItemRow) : null;
};
