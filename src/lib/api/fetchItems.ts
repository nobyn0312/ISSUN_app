// fetchItems.ts
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { firestore } from '@/lib/config/firebase';

// Item型を定義
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

export const fetchItems = async (
  sortOrder: 'newest' | 'oldest' = 'newest'
): Promise<Item[]> => {
  const itemsCollection = collection(firestore, 'item');
  const itemsQuery = query(
    itemsCollection,
    orderBy('createdAt', sortOrder === 'newest' ? 'desc' : 'asc')
  );
  const snapshot = await getDocs(itemsQuery);

  const itemsList: Item[] = snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Item, 'id'>),
  }));

  return itemsList;
};

// 特定のIDを持つアイテムを取得する関数
export const fetchItemById = async (id: string): Promise<Item | null> => {
  const itemsCollection = collection(firestore, 'item');
  const snapshot = await getDocs(itemsCollection);

  const item = snapshot.docChanges().find(change => change.doc.id === id);

  return item
    ? { id: item.doc.id, ...(item.doc.data() as Omit<Item, 'id'>) }
    : null;
};
